const express = require('express');
const CartItem = require('../models/CartItem');
const Event = require('../models/Event');
const router = express.Router();

// Add event to cart
router.post('/', async (req, res) => {
  const { eventId } = req.body;

  try {
    let item = await CartItem.findOne({ eventId });
    if (item) {
      item.quantity += 1;
      await item.save();
    } else {
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ error: 'Event not found' });

      item = new CartItem({ eventId, quantity: 1 });
      await item.save();
    }

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cart items
router.get('/', async (req, res) => {
  const items = await CartItem.find().populate('eventId');
  res.json(items);
});

module.exports = router;
