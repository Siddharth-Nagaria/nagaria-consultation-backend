const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const { featured, approved } = req.query;
    let filter = {};
    
    if (featured) filter.featured = featured === 'true';
    if (approved !== undefined) filter.approved = approved === 'true';
    else filter.approved = true; // Default to approved only

    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single testimonial by ID
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new testimonial
router.post('/', async (req, res) => {
  const testimonial = new Testimonial({
    name: req.body.name,
    position: req.body.position,
    company: req.body.company,
    message: req.body.message,
    rating: req.body.rating,
    imageUrl: req.body.imageUrl,
    featured: req.body.featured,
    approved: req.body.approved
  });

  try {
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update testimonial
router.patch('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        testimonial[key] = req.body[key];
      }
    });

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete testimonial
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await testimonial.deleteOne();
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
