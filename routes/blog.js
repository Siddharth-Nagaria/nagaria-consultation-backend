const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const { category, featured, published } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    if (published !== undefined) filter.published = published === 'true';
    else filter.published = true; // Default to published only

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // Increment views
    blog.views += 1;
    await blog.save();
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog post by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // Increment views
    blog.views += 1;
    await blog.save();
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new blog post
router.post('/', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    slug: req.body.slug,
    excerpt: req.body.excerpt,
    content: req.body.content,
    author: req.body.author,
    category: req.body.category,
    tags: req.body.tags,
    imageUrl: req.body.imageUrl,
    published: req.body.published,
    featured: req.body.featured
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update blog post
router.patch('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        blog[key] = req.body[key];
      }
    });

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete blog post
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
