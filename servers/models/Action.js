// server/models/Action.js
const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  userId: String, // For multi-user support
  description: String,
  suggestedAt: { type: Date, default: Date.now },
  acceptedAt: Date,
  completedAt: Date,
});

module.exports = mongoose.model('Action', ActionSchema);
