// server/routes/chat.js
const express = require('express');
const router = express.Router();
const openai = require('../openai');
const Message = require('../models/message');

router.post('/completion', async (req, res) => {
  const { message } = req.body;

  try {
    // Save user's message
    const userMessage = new Message({ sender: 'user', text: message });
    await userMessage.save();

    // Get bot response from OpenAI
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const botReply = completion.data.choices[0].message.content;

    // Save bot's response
    const botMessage = new Message({ sender: 'bot', text: botReply });
    await botMessage.save();

    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

module.exports = router;
