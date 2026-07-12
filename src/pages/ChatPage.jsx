import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchMessages } from "../api/chatApi";
import useSocket from "../hooks/useSocket";
import ChatHeader from "../components/ChatHeader";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";

const ChatPage = () => {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const socket = useSocket();

  // ask for username on mount
  useEffect(() => {
    const savedName = localStorage.getItem("chat_username");
    if (savedName) {
      setUsername(savedName);
      setIsJoined(true);
    }
  }, []);

  // fetch messages using tanstack query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    enabled: isJoined,
  });

  const messages = data?.data || [];

  // handle sending message via socket
  const handleSend = (text) => {
    if (!text) return;

    console.log("Sending message:", text);
    socket.emit("send_message", {
      username: username,
      message: text,
    });
  };

  // handle joining the chat
  const handleJoin = (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed === "") {
      toast.error("Please enter a username!");
      return;
    }
    localStorage.setItem("chat_username", trimmed);
    setUsername(trimmed);
    setIsJoined(true);
    toast.success(`Welcome, ${trimmed}! 🎉`);
  };

  // show join form if not joined yet
  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            💬 Join Chat
          </h2>
          <p className="text-gray-500 text-sm mb-6 text-center">
            Enter your name to start chatting
          </p>
          <form onSubmit={handleJoin}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-[700px] h-[85vh] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
        <ChatHeader />

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400">Loading messages...</p>
          </div>
        ) : isError ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-red-400">Failed to load messages 😔</p>
          </div>
        ) : (
          <ChatBox messages={messages} currentUser={username} />
        )}

        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
