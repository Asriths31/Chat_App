import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdChat } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { fetchMessages } from "./chatApi";
import useSocket from "./useSocket";
import ChatHeader from "./components/ChatHeader";
import ChatBox from "./components/ChatBox";
import MessageInput from "./components/MessageInput";

const ChatPage = () => {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const socket = useSocket();
 // fetch messages using tanstack query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    enabled: isJoined,
  });
  // ask for username on mount
  useEffect(() => {
    const savedName = localStorage.getItem("chat_username");
    if (savedName) {
      setUsername(savedName);
      setIsJoined(true);
    }
  }, []);

  // handle socket connections and user lists
  useEffect(() => {
    if (isJoined && username && socket && !isLoading) {
      socket.emit("join_chat", username);

      const handleUsersList = (usersList) => {
        setUsers(usersList);
      };

      socket.on("users_list", handleUsersList);

      return () => {
        socket.off("users_list", handleUsersList);
      };
    }
  }, [isJoined, username, socket, isLoading]);

 

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center flex items-center justify-center gap-2">
            <MdChat className="text-blue-500" /> Join Chat
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
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 text-sm mb-4 transition-all"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[900px] h-[85vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex overflow-hidden">
        
        {/* Sidebar for Users */}
        <div className="w-64 bg-gray-50/50 border-r border-gray-200 flex-col hidden sm:flex z-10">
          <div className="p-4 border-b border-gray-200 bg-white shadow-sm z-10">
            <h2 className="font-semibold text-gray-700 flex items-center justify-between">
              <span className="flex items-center gap-2"><FiUsers /> Users</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {users.length}
              </span>
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {users.map((u, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm shadow-inner">
                  {u.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {u}
                    {u === username && <span className="ml-1.5 text-[10px] text-gray-400 font-normal bg-gray-100 px-1.5 py-0.5 rounded">(You)</span>}
                  </p>
                  <p className="text-[11px] text-green-500 flex items-center gap-1.5 mt-0.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block shadow-sm"></span> Online
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <ChatHeader onExit={() => {
            localStorage.removeItem("chat_username");
            window.location.reload();
          }} />

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center bg-gray-50/50">
              <p className="text-gray-400 font-medium">Loading messages...</p>
            </div>
          ) : isError ? (
            <div className="flex-1 flex items-center justify-center bg-gray-50/50">
              <p className="text-red-400 font-medium">Failed to load messages</p>
            </div>
          ) : (
            <ChatBox messages={messages} currentUser={username} />
          )}

          <MessageInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
