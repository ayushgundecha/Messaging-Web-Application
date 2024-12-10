const express = require('express');
const Message = require('../models/messages.mongo');
const User = require('../models/users.mongo');
const messagesRouter = express.Router();


messagesRouter.get("/unassigned", async (req, res) => {
    try {
        const messages = await Message.aggregate([
            { $match: { assigned_to: null } }, // Unassigned messages
            {
                $group: {
                    _id: "$user_id",
                    messages: { $push: { message_body: "$message_body", timestamp: "$timestamp" } },
                    latest_message: { $last: "$message_body" },
                    latest_timestamp: { $last: "$timestamp" }
                }
            },
            { $sort: { latest_timestamp: -1 } }
        ]);

        res.status(200).json({ chats: messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
    }
});

messagesRouter.post('', async (req, res) => {
    const { name, email, message_body } = req.body;

    if (!name || !email || !message_body) {
        return res.status(400).json({ error: "Name, email, and message body are required." });
    }

    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            // Create a new user
            user = new User({
                user_id: email,
                name,
            });
            await user.save();
        }

        // Save the message
        const message = new Message({
            user_id: user.user_id,
            message_body
        });
        await message.save();

        res.status(201).json({ message: "Message created successfully.", data: message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
    }
});



module.exports = messagesRouter;

