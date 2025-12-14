📸 Instagram Mini Clone
A full-stack social media application built with the MERN stack, featuring user authentication, real-time interactions, and a personalized feed system.

✨ Features

🔐 JWT Authentication - Secure signup/login with password hashing
👤 User Profiles - Follow/unfollow users, view profiles with post counts
📝 Posts - Create posts with images and captions
❤️ Interactions - Like/unlike posts, add comments
📱 Personalized Feed - See posts only from followed users
🎨 Responsive Design - Works on mobile, tablet, and desktop

🛠️ Tech Stack
Frontend: React.js, Context API, React Router, Axios
Backend: Node.js, Express.js, JWT, bcryptjs
Database: MongoDB, Mongoose
🚀 Quick Start
Prerequisites

Node.js v14+
MongoDB (local or Atlas)

Installation

Clone the repository

bash   git clone https://github.com/yourusername/instagram-mini-clone.git
   cd instagram-mini-clone

Backend Setup

bash   cd backend
   npm install
Create .env:
env   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/instagram-clone
   JWT_SECRET=your_secret_key
Start server:
bash   npm start

Frontend Setup

bash   cd frontend
   npm install
   npm start
Visit http://localhost:3000 🎉
📡 API Endpoints
MethodEndpointDescriptionPOST/api/auth/signupRegister userPOST/api/auth/loginLogin userGET/api/posts/feedGet personalized feedPOST/api/postsCreate postPOST/api/posts/:id/likeLike/unlike postPOST/api/posts/:id/commentAdd commentPOST/api/users/:id/followFollow/unfollow user
🏗️ Architecture
Frontend (React)  ←→  Backend (Express)  ←→  Database (MongoDB)
   - Components        - REST APIs            - User Schema
   - Context API       - JWT Auth             - Post Schema  
   - Routing           - Middleware           - Relationships
💡 Key Technical Highlights

Authentication: JWT tokens with 7-day expiration, bcryptjs password hashing
Database Design: Many-to-many relationships for follow system, embedded comments
Feed Algorithm: MongoDB queries filtering posts by followed users
State Management: React Context API for global auth state
Security: Protected routes, token verification, input validation

📂 Project Structure
├── backend/
│   ├── src/
│   │   ├── models/       # User, Post schemas
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth middleware
│   │   └── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/   # Navbar, PostCard
    │   ├── pages/        # Home, Profile, Login
    │   ├── services/     # API calls
    │   └── context/      # Auth context
    └── package.json
🎯 What I Learned

Building RESTful APIs with Express.js
Implementing JWT authentication from scratch
Managing complex database relationships in MongoDB
React hooks (useState, useEffect, useContext)
Responsive UI design with CSS
Full-stack integration and deployment

🔮 Future Enhancements

 Image upload (Cloudinary integration)
 Real-time notifications (Socket.io)
 Direct messaging
 Search functionality
 Hashtags and mentions
 Stories feature

📝 License
MIT License - Free to use for learning purposes
