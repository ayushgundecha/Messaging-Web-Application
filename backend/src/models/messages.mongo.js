const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  user_id: { type: String, required: true }, // Reference to the Users collection
  timestamp: { type: Date, default: Date.now }, // Timestamp of message creation
  message_body: { type: String, required: true }, // The content of the message
  sender_type: { type: String, enum: ["user", "agent"], required: true, default: "user" },
  status: { type: String, default: "open" }, // e.g., "open", "closed"
  assigned_to: { type: String, default: null }, // Agent ID handling the message
  priority: { type: String, default: "low" }, // e.g., "low", "medium", "high"
  created_at: { type: Date, default: Date.now } // Timestamp when the message was added to DB
});

module.exports = mongoose.model("Message", MessageSchema);
