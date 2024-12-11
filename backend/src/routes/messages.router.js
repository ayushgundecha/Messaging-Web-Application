const express = require('express');
const Message = require('../models/messages.mongo');
const User = require('../models/users.mongo');
const messagesRouter = express.Router();

messagesRouter.get("/unassigned", async (req, res) => {
    try {
        const messages = await Message.aggregate([
            { $match: { assigned_to: null } }, // Only unassigned messages
            {
                $group: {
                    _id: "$user_id", // Group by user ID
                    latest_message: { $last: "$message_body" }, // Latest message of the user
                    latest_timestamp: { $last: "$timestamp" }, // Timestamp of the latest message
                    latest_priority: { $last: "$priority" }

                },
            },
            {  $sort: {
                latest_priority: 1, // Sort by priority: "high" (1) first, "low" (0) last
                latest_timestamp: -1, // Then sort by timestamp: latest first
            }, }, // Sort by latest message timestamp
        ]);

        res.status(200).json({ chats: messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
    }
});

messagesRouter.get("/conversations/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const messages = await Message.find({ user_id: id }).sort({ timestamp: 1 }); // Sort by timestamp
        res.status(200).json({ user_id: id, messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
    }
});

messagesRouter.post("/agent/reply", async (req, res) => {
    const { user_id, message_body } = req.body;

    try {
        const newMessage = new Message({
            user_id,
            message_body,
            sender_type: "agent",
        });

        await newMessage.save();
        res.status(201).json({ message: "Reply sent successfully." });
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

    // Define keywords for urgency
    const urgentKeywords = ["urgent", "loan approval", "help now", "immediate", "asap"];
    const isUrgent = urgentKeywords.some(keyword =>
        message_body.toLowerCase().includes(keyword.toLowerCase())
    );

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
            message_body,
            priority: isUrgent ? "high" : "low" // Mark high only if urgent
        });
        await message.save();

        res.status(201).json({ message: "Message created successfully.", data: message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error." });
    }
});




module.exports = messagesRouter;

