const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Agent = require('../models/agent.mongo');

require('dotenv').config();

const authRouter = express.Router();


authRouter.post(
    '/signup',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
        body('name').notEmpty(),
    ],
    async (req, res) => {

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, password } = req.body;

            const existingUser = await Agent.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ error: 'Email already in use.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new Agent({ name, email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: 'Agent created successfully.' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred during signup.' });
        }
    });

authRouter.post(
    '/login',
    [
        body('email').isEmail(),
        body('password').notEmpty(),
    ],

    async (req, res) => {

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            const agent = await Agent.findOne({ email });
            if (!agent) {
                return res.status(401).json({ error: 'Invalid credentials.' });
            }

            const isMatch = await bcrypt.compare(password, agent.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials.' });
            }
            const token = jwt.sign({ userId: agent._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('authToken', token, {
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Ensures cookies are sent over HTTPS in production
                maxAge: 3600000, // 1 hour in milliseconds
                sameSite: 'lax', // Ensures cookies are only sent on same-site requests
            });

            res.status(200).json({ message: 'Login successful.' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred during login.' });
        }
    });


module.exports = authRouter;
