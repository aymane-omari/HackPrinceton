// server/routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// Get chat history
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new message
router.post('/', async (req, res) => {
  const { sender, text } = req.body;
  const message = new Message({ sender, text });
  try {
    const savedMessage = await message.save();
    res.json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
