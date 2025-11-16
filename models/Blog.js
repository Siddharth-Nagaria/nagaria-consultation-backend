const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  author: {
    type: String,
    required: true,
    default: 'Digi-Consult Team'
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Business', 'Marketing', 'Design', 'Development', 'Other']
  },
  tags: [{
    type: String
  }],
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/800x400'
  },
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
