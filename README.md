# TourBuddy

![TourBuddy Logo](https://img.shields.io/badge/TourBuddy-Travel%20Community%20Platform-blue)

TourBuddy is a comprehensive web platform that facilitates group travel by connecting travelers, sharing experiences, and enabling collaborative trip planning. The platform allows users to list and review destinations they've visited, helping others make informed travel decisions.

## 🌟 Features

- *User Authentication*
  - Email-based registration with verification
  - Google OAuth integration
  - Secure login system

- *Travel Communities*
  - Create and join travel groups
  - Real-time discussion forums using Socket.io
  - Like/dislike message system

- *Destination Management*
  - Add and browse travel destinations
  - Multiple image uploads via Cloudinary
  - Interactive maps with Mapbox integration

- *AI-Powered Features*
  - Automatic place descriptions using Google's Gemini AI
  - Smart content generation

- *Review System*
  - Comprehensive rating and review functionality
  - User feedback on destinations

- *Weather Information*
  - Real-time weather data for destinations
  - Powered by OpenWeather API

## 🛠 Tech Stack

- *Backend*
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - Socket.io for real-time communication

- *Frontend*
  - EJS (Embedded JavaScript templates)
  - JavaScript

- *Authentication*
  - Passport.js
  - JWT
  - Google OAuth 2.0

- *APIs*
  - Google Gemini AI
  - Mapbox
  - OpenWeather
  - Cloudinary

## 📋 Prerequisites

- Node.js (v20.14.0 or higher)
- MongoDB
- API keys for:
  - Google Gemini AI
  - Mapbox
  - OpenWeather
  - Cloudinary
  - Google OAuth

## 🚀 Installation

1. *Clone the repository*
   bash
   git clone https://github.com/yourusername/TourBuddy.git
   cd TourBuddy
   

2. *Install dependencies*
   bash
   npm install
   

3. *Create a .env file in the root directory with the following variables*
   
   NODE_ENV=development
   ATLAS_DB_URL=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CALL_BACK_URI=your_callback_uri

   # Cloudinary
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret

   # Mapbox
   MAP_TOKEN=your_mapbox_token

   # Weather API
   WEATHER_API_KEY=your_openweather_api_key

   # Google Gemini AI
   GEMINI_AI_API_KEY=your_gemini_api_key

   # Email (for verification)
   GMAIL_USER=your_gmail_address
   GMAIL_PASS=your_gmail_app_password
   

4. *Start the server*
   bash
   node app.js
   

5. *Access the application*
   Open your browser and navigate to http://localhost:3000

## 📱 Usage

### User Registration and Login
- Register with email (verification required)
- Login with email or Google account
- Manage your profile

### Exploring Places
- Browse destinations added by the community
- View detailed information, images, and location on map
- Check real-time weather information

### Adding Places
- Share your travel experiences by adding new destinations
- Upload multiple images
- Provide detailed descriptions or use AI to generate them

### Community Interaction
- Join discussion forums based on travel categories
- Engage in real-time conversations with other travelers
- Like/dislike messages to show agreement or disagreement

### Reviews and Ratings
- Rate places you've visited
- Write detailed reviews to help other travelers
- Read reviews from other community members

## 🤝 Contributing

We welcome contributions to TourBuddy! If you'd like to contribute, please:
1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

If you have any questions or suggestions, please feel free to reach out to the project maintainers.
