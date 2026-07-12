import { useRef, useEffect } from "react";
import { MdOutlineWavingHand } from "react-icons/md";
import Message from "./Message";

// Helper to format the date for the badge
const getDateLabel = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};

const ChatBox = ({ messages, currentUser }) => {
  const bottomRef = useRef(null);

  // auto scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessages = () => {
    let lastDateLabel = null;
    const elements = [];

    messages.forEach((msg) => {
      const currentDateLabel = getDateLabel(msg.createdAt);

      if (currentDateLabel && currentDateLabel !== lastDateLabel) {
        elements.push(
          <div key={`date-${msg._id}-${currentDateLabel}`} className="flex justify-center my-5 z-0">
            <span className="bg-gray-200/80 text-gray-500 border border-gray-200 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
              {currentDateLabel}
            </span>
          </div>
        );
        lastDateLabel = currentDateLabel;
      }

      elements.push(
        <Message key={msg._id} msg={msg} currentUser={currentUser} />
      );
    });

    return elements;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 relative">
      {messages && messages.length > 0 ? (
        renderMessages()
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            No messages yet. Say something! <MdOutlineWavingHand className="text-lg text-yellow-500" />
          </p>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBox;
