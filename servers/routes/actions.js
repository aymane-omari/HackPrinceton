// server/routes/actions.js
const express = require('express');
const router = express.Router();
const Action = require('../models/Action');

// Store suggested action
router.post('/', async (req, res) => {
  const { userId, description } = req.body;
  const action = new Action({ userId, description });
  try {
    const savedAction = await action.save();
    res.json(savedAction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept action
router.post('/:id/accept', async (req, res) => {
  try {
    const action = await Action.findByIdAndUpdate(
      req.params.id,
      { acceptedAt: Date.now() },
      { new: true }
    );
    res.json(action);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Complete action
router.post('/:id/complete', async (req, res) => {
  try {
    const action = await Action.findByIdAndUpdate(
      req.params.id,
      { completedAt: Date.now() },
      { new: true }
    );
    res.json(action);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get action history
router.get('/:userId', async (req, res) => {
  try {
    const actions = await Action.find({ userId: req.params.userId });
    res.json(actions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
