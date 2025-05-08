// backend/models/CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItemSchema);
