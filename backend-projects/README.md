# Dynamic Profile API

This backend intership at HNG project stage 0.
A RESTful API endpoint that returns profile information with dynamic cat facts.

## Features

- GET /me endpoint with profile information
- Dynamic cat facts from external API
- Proper error handling and fallbacks
- CORS enabled
- Environment-based configuration

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file (see Environment Variables)
4. Start server: `npm run dev`

## Environment Variables

Create a `.env` file:
```env
PORT=3000
USER_EMAIL=your-email@example.com
USER_NAME=Your Full Name
USER_STACK=Node.js/Express