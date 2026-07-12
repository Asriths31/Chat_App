# 💬 Chat App - Real-time MERN Chat Application

A simple one-room real-time chat application built with the MERN stack and Socket.io.

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- TanStack Query
- Socket.io Client
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- dotenv
- cors
- nodemon

### Database
- MongoDB Atlas

---

## Features

- Send and receive messages in real-time
- Messages stored in MongoDB (persist after refresh)
- WhatsApp-style message bubbles (own = right, others = left)
- Timestamps on every message
- Auto-scroll to latest message
- Enter key to send
- Username-based identification (stored in localStorage)

---

## Folder Structure

```
chat-app/
├── client/
│   └── src/
│       ├── api/
│       │   └── chatApi.js          # Axios instance + API calls
│       ├── components/
│       │   ├── ChatBox.jsx         # Message list with auto-scroll
│       │   ├── ChatHeader.jsx      # Header bar
│       │   ├── Message.jsx         # Single message bubble
│       │   └── MessageInput.jsx    # Input field + send button
│       ├── hooks/
│       │   └── useSocket.js        # Socket listener + cache update
│       ├── pages/
│       │   └── ChatPage.jsx        # Main chat page
│       ├── services/
│       │   └── socket.js           # Socket.io client instance
│       ├── App.jsx                 # Routes + providers
│       ├── main.jsx                # React entry point
│       └── index.css               # Tailwind CSS
│
├── server/
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   └── chatController.js       # GET & POST message handlers
│   ├── models/
│   │   └── Message.js              # Mongoose message schema
│   ├── routes/
│   │   └── chatRoutes.js           # Express API routes
│   ├── sockets/
│   │   └── socket.js               # Socket.io server setup
│   ├── app.js                      # Express app config
│   ├── server.js                   # Entry point
│   └── .env                        # Environment variables
```

---

## Installation

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd chat-app
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```
PORT=2000
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/chatapp
```

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

---

## API Endpoints

### GET `/api/messages`
Returns all messages sorted by oldest first.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "username": "John",
      "message": "Hello!",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST `/api/messages`
Saves a new message and broadcasts it via socket.

**Request Body:**
```json
{
  "username": "John",
  "message": "Hello!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "username": "John",
    "message": "Hello!",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

## Socket Events

| Event             | Direction        | Description                              |
|-------------------|------------------|------------------------------------------|
| `connection`      | Client → Server  | Client connects to socket server         |
| `send_message`    | Client → Server  | Client sends a new message               |
| `receive_message` | Server → Client  | Server broadcasts saved message to all   |
| `disconnect`      | Client → Server  | Client disconnects from socket server    |

---

## How It Works

1. User enters a username to join the chat room
2. Previous messages are fetched via `GET /api/messages` (TanStack Query)
3. When user sends a message, it's emitted via `send_message` socket event
4. Server saves the message to MongoDB and emits `receive_message` to all clients
5. The `useSocket` hook listens for `receive_message` and updates the TanStack Query cache
6. UI re-renders with the new message, auto-scrolling to the bottom

---

## Assumptions

- Single chat room (no multiple rooms)
- Username is entered manually (no auth)
- Username is stored in localStorage for persistence
- All users see all messages

---

## Scripts

### Server
```bash
npm run dev    # Start with nodemon
npm start      # Start with node
```

### Client
```bash
npm run dev    # Start Vite dev server
npm run build  # Build for production
```
