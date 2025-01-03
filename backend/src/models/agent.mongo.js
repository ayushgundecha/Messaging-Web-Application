const mongoose = require('mongoose');

const AgentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});

const Agent = mongoose.model('Agent', AgentSchema);

module.exports = Agent;
