const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const messagesRouter = require('./routes/messages.router');

require('dotenv').config();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(morgan('combined'));

app.use('/api/messages', messagesRouter);

app.get('/', (req, res)=>{
    res.send('Hello World!');
});

module.exports = app;