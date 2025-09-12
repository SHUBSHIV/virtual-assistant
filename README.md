📌 Virtual Assistant

A Virtual Assistant Web Application built with the MERN stack (MongoDB, Express, React, Node.js).
It provides authentication, personalization, and assistant features like voice/text interaction, and user account management.

🚀 Features

🔑 User Authentication (Sign In / Sign Up with validation)

👤 User Context (Global state with React Context API)

🔊 Virtual Assistant UI (Voice / AI integration possible)

🎨 Modern UI with Tailwind CSS

💾 Persistent User Data with LocalStorage + MongoDB

🌍 Backend API with Express + MongoDB

🔐 JWT-based Authentication (with withCredentials)

🛠️ Tech Stack

Frontend:

React.js

Tailwind CSS

React Router DOM

Axios

React Icons

Backend:

Node.js

Express.js

MongoDB + Mongoose

📂 Project Structure
VirtualAssistant/
│── backend/          # Express + MongoDB server
│   ├── routes/       # Auth & API routes
│   ├── models/       # User model
│   ├── controllers/  # Logic handlers
│   └── server.js     # Entry point
│
│── frontend/         # React App
│   ├── src/
│   │   ├── assets/   # Images (authBg.png, logos etc.)
│   │   ├── context/  # UserContext
│   │   ├── pages/    # SignIn, SignUp, Home etc.
│   │   └── App.js
│
│── README.md         # Project documentation
│── package.json

⚡ Getting Started
1️⃣ Clone the repo
git clone https://github.com/your-username/VirtualAssistant.git
cd VirtualAssistant

2️⃣ Backend Setup
cd backend
npm install


Create .env file inside backend/

PORT=//
MONGO_URI=""
JWT_SECRET=your_secret_key


Run backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on: http://localhost:
Backend runs on: http://localhost:

🔑 Authentication Flow

User enters Email & Password

Frontend sends request → POST /api/auth/signin

Backend validates user & returns token + data

User data stored in React Context + LocalStorage

User redirected to Home/Dashboard
