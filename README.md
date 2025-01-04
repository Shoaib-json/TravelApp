# TripTale

TripTale is a modern property rental platform that connects travelers with unique accommodations worldwide. Built with Node.js and MongoDB, it offers a seamless experience for both hosts and travelers.

## Overview

TripTale enables property owners to list their spaces and travelers to discover and book unique accommodations. The platform features robust search capabilities, a review system, and secure user authentication.

## Core Features

### For Travelers
- Advanced property search with location filters
- Detailed property listings with high-resolution images
- Verified user reviews and ratings
- Secure authentication system

### For Hosts
- Intuitive listing management
- Property details customization
- Review management tools
- Analytics dashboard

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS, Bootstrap
- **Authentication**: Custom JWT implementation
- **Validation**: Custom schema validation

## API Documentation

### Authentication
```http
POST /auth/register
POST /auth/login
```

### Properties
```http
GET    /listings          # Get all listings
GET    /listings/:id      # Get specific listing
POST   /listings         # Create listing
PUT    /listings/:id     # Update listing
DELETE /listings/:id     # Delete listing
```

### Reviews
```http
POST   /listings/:id/reviews    # Add review
DELETE /listings/:id/reviews    # Remove review
```

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/triptale.git
cd triptale
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the application**
```bash
npm run dev     # Development
npm start       # Production
```

## Project Structure
```
triptale/
├── controllers/         # Business logic
├── models/             # Database schemas
├── routes/             # API routes
├── middleware/         # Custom middleware
├── views/             # EJS templates
├── public/            # Static assets
└── config/            # Configuration files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Roadmap

### Phase 1 - Q1 2024
- [x] User authentication
- [x] Property listings
- [x] Search functionality
- [x] Review system

### Phase 2 - Q2 2024
- [ ] Payment integration
- [ ] Host dashboard
- [ ] Booking system
- [ ] Enhanced search filters

## Support

For support, please email support@triptale.com or open an issue in the GitHub repository.

## Security

Found a security vulnerability? Please email security@triptale.com instead of opening a public issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
