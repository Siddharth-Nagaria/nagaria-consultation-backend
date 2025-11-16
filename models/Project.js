const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  client: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'Mobile App', 'Digital Marketing', 'Consulting', 'Design', 'Other']
  },
  technologies: [{
    type: String
  }],
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/600x400'
  },
  projectUrl: {
    type: String
  },
  duration: {
    type: String
  },
  status: {
    type: String,
    enum: ['completed', 'ongoing', 'upcoming'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
