import { useState } from "react";
import { MdSend } from "react-icons/md";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex gap-3 p-4 bg-white border-t border-gray-200 rounded-b-2xl z-10">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 px-5 py-3 bg-gray-50 border border-gray-300 rounded-full outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 text-sm transition-all"
      />
      <button
        onClick={handleSend}
        disabled={text.trim() === ""}
        className="px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        <span>Send</span>
        <MdSend className="text-lg" />
      </button>
    </div>
  );
};

export default MessageInput;
