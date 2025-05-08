const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Create event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

module.exports = router;
