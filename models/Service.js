const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    trim: true
  },
  icon: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  price: {
    type: String,
    default: 'Custom'
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', serviceSchema);
