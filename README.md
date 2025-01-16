# TravelApp

A web application built with Node.js and Express that provides user authentication and travel-related features.

## Technology Stack

- Backend: Node.js, Express
- Database: MongoDB
- Template Engine: EJS
- Authentication: Passport.js
- Session Management:  express-session
- Other Tools: 
  - method-override
  - connect-flash
  - ejs-mate

## Project Structure

```
TRAVELAPP/
├── controllers/        # Route controllers
│   ├── list.js
│   ├── login.js
│   └── review.js
├── init/              # Initialization scripts
│   ├── index.js
│   └── init.js
├── models/            # Database models
│   ├── listing.js
│   ├── login.js
│   └── review.js
├── public/           
│   └── css/          # Stylesheets
├── routes/           # Route definitions
│   ├── list.js
│   ├── login.js
│   └── reviews.js
├── utils/            # Utility functions
│   ├── error.js
│   ├── middleware.js
│   └── schema.js
├── views/            # EJS templates
│   ├── includes/
│   ├── layouts/
│   └── listing/
├── app.js            # Application entry point
└── package.json      # Project dependencies
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd TravelApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB:
   - Ensure MongoDB is installed and running
   - Default connection string: `mongodb://127.0.0.1:27017/reuse`

4. Start the application:
   ```bash
   node app.js
   ```
   The server will start on port 8080.

## Features

- User authentication with Passport.js
- Session management
- Flash messages for user feedback
- RESTful routing
- MVC architecture
- Static file serving
- Method override support
- EJS templating with EJS-Mate

## Environment Variables

The following environment variables can be configured:
- `PORT` (default: 8080)
- `SESSION_SECRET` (default: "truck")
- `MONGODB_URI` (default: "mongodb://127.0.0.1:27017/reuse")

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a Pull Request


## Contact

shoaibkhan1504@gmail.com
