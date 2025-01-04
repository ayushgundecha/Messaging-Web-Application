const path= require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");

const messagesRouter = require('./routes/messages.router');
const authRouter = require('./routes/auth.router');

require('dotenv').config();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(
    cors({
      credentials: true, // Allow credentials (cookies) to be sent
    })
  );
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '..','public')));

app.use('/api/messages', messagesRouter);

app.use('/api/auth', authRouter);

app.get('/*', (req, res)=> {
  res.sendFile(path.join(__dirname,'..','public', 'index.html'));
});


module.exports = app;