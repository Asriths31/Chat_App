import { MdChatBubble, MdExitToApp } from "react-icons/md";

const ChatHeader = ({ onExit }) => {
  return (
    <div className="bg-blue-600 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center shadow-sm z-10">
      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <MdChatBubble /> Chat Room
        </h1>
        <p className="text-sm text-blue-200 mt-0.5">One room. Everyone's here.</p>
      </div>
      <button 
        onClick={onExit}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition-colors text-sm font-medium shadow-sm text-white border border-red-400"
      >
        <MdExitToApp className="text-lg" />
        Exit Chat
      </button>
    </div>
  );
};

export default ChatHeader;
