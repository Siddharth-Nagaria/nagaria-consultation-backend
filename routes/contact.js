const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// 👉 Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 👉 Get single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 👉 Create new contact + send email
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    company: req.body.company,
    subject: req.body.subject,
    message: req.body.message
  });

  try {
    // Save to database
    const newContact = await contact.save();

    // Send email through Resend (NO DOMAIN REQUIRED)
    try {
      await resend.emails.send({
        from: "Website Contact <onboarding@resend.dev>",
        to: process.env.EMAIL_USER,
        subject: `New Contact Submission: ${req.body.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Phone:</strong> ${req.body.phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${req.body.company || 'N/A'}</p>
          <p><strong>Subject:</strong> ${req.body.subject}</p>
          <p><strong>Message:</strong><br/>${req.body.message}</p>
        `
      });

      console.log("📧 Email sent successfully");
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contact: newContact
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 👉 Update contact status
router.patch('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (req.body.status) {
      contact.status = req.body.status;
    }

    const updated = await contact.save();
    res.json(updated);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 👉 Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.deleteOne();
    res.json({ message: 'Contact deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
