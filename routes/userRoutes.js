const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 🔐 Register User
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔑 Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 👤 Get all users (optional/admin)
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
