# Digi-Consult Backend API

A RESTful API built with Node.js, Express, and MongoDB for the Digi-Consult consulting website.

## Features

- RESTful API endpoints for managing:
  - Contact form submissions
  - Services
  - Projects/Portfolio
  - Testimonials
  - Blog posts
- MongoDB database integration
- Input validation
- CORS enabled
- Error handling

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment variables management
- **nodemailer** - Email notifications (optional)
- **validator** - Data validation

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `digi-consult`

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digi-consult
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
NODE_ENV=development
```

## Running the Server

Development mode (with nodemon):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Contact
- `GET /api/contact` - Get all contact submissions
- `GET /api/contact/:id` - Get single contact by ID
- `POST /api/contact` - Create new contact submission
- `PATCH /api/contact/:id` - Update contact status
- `DELETE /api/contact/:id` - Delete contact

### Services
- `GET /api/services` - Get all active services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create new service
- `PATCH /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Projects
- `GET /api/projects` - Get all projects (supports query params: category, status, featured)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Testimonials
- `GET /api/testimonials` - Get all testimonials (supports query params: featured, approved)
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create new testimonial
- `PATCH /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### Blog
- `GET /api/blog` - Get all blog posts (supports query params: category, featured, published)
- `GET /api/blog/:id` - Get single blog post by ID
- `GET /api/blog/slug/:slug` - Get blog post by slug
- `POST /api/blog` - Create new blog post
- `PATCH /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post

## Database Models

### Contact
- name, email, phone, company, subject, message, status, createdAt

### Service
- title, description, icon, features, price, active, createdAt

### Project
- title, description, client, category, technologies, imageUrl, projectUrl, duration, status, featured, createdAt

### Testimonial
- name, position, company, message, rating, imageUrl, featured, approved, createdAt

### Blog
- title, slug, excerpt, content, author, category, tags, imageUrl, published, featured, views, createdAt, updatedAt

## Error Handling

The API includes comprehensive error handling for:
- Invalid requests
- Database errors
- Validation errors
- Not found resources

## Future Enhancements

- Authentication & Authorization (JWT)
- File upload for images
- Email notifications for contact forms
- Rate limiting
- API documentation with Swagger
- Admin dashboard integration

## License

MIT
