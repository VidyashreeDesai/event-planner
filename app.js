const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
 app.use(express.json());

// MongoDB Atlas Connection
const MONGODB_URI =  'mongodb+srv://vidyashreedesai016:vidya1234@event-planner.qdyh1nx.mongodb.net/';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB Atlas connection error:', err));

// Routes
const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

app.put('/api/item/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
