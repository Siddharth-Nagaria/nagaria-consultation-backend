const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => console.error('MongoDB Connection Error:', err));

// Import Routes
const contactRoutes = require('./routes/contact');
const serviceRoutes = require('./routes/services');
const projectRoutes = require('./routes/projects');
const testimonialRoutes = require('./routes/testimonials');
const blogRoutes = require('./routes/blog');

// Use Routes
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blog', blogRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Digi-Consult API',
    version: '1.0.0',
    endpoints: {
      contact: '/api/contact',
      services: '/api/services',
      projects: '/api/projects',
      testimonials: '/api/testimonials',
      blog: '/api/blog'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
