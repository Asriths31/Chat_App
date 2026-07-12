import { useRef, useEffect } from "react";
import Message from "./Message";

const ChatBox = ({ messages, currentUser }) => {
  const bottomRef = useRef(null);

  // auto scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {messages && messages.length > 0 ? (
        messages.map((msg) => (
          <Message key={msg._id} msg={msg} currentUser={currentUser} />
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400 text-sm">
            No messages yet. Say something! 👋
          </p>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBox;
