# 📝 BlogAI - Full Stack MERN Blog Platform

A modern and responsive full-stack blogging platform built with the MERN Stack. BlogAI allows users to create, manage, and share blog posts with a clean user experience and secure authentication system.

## 🚀 Features

- 🔐 Secure User Authentication & Authorization
- ✍️ Create, Edit, and Delete Blog Posts
- 📖 Read and Explore Published Blogs
- 👤 User Profile Management
- 🌙 Responsive and Modern UI
- ⚡ Fast REST API Architecture
- 💾 MongoDB Database Integration
- 🔒 Protected Routes and JWT Authentication

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS / CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Token)
- Bcrypt.js

## 📂 Project Structure

```bash
BlogAI/
│
├── client/          # Frontend (React)
├── server/          # Backend (Node.js + Express)
├── README.md
└── package.json
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd BlogAI
```

### 2️⃣ Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the server directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Run the Application

Backend:

```bash
cd server
npm start
```

Frontend:

```bash
cd client
npm start
```

## 🎯 Future Improvements

- ❤️ Like & Comment System
- 🔍 Blog Search Functionality
- 📌 Categories & Tags
- 📊 User Dashboard
- 🌐 Social Media Sharing
- 🌓 Dark / Light Theme Support

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

## 📜 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving it a star on GitHub!

Built with ❤️ using MongoDB, Express.js, React.js, and Node.js.
