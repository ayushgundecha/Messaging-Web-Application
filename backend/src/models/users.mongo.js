const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true }, // Auto-generated unique ID
    name: { type: String, default: "John" }, // User's name
    created_at: { type: Date, default: Date.now }, // Account creation date
    last_active: { type: Date, default: Date.now } // Tracks last activity
});

module.exports = mongoose.model("User", UserSchema);
