const Message = ({ msg, currentUser }) => {
  const isOwn = msg.username === currentUser;

  // format time like "2:30 PM"
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-xl ${
          isOwn
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none shadow-sm"
        }`}
      >
        {!isOwn && (
          <p className="text-xs font-semibold text-blue-600 mb-1">
            {msg.username}
          </p>
        )}
        <p className="text-sm break-words">{msg.message}</p>
        <p
          className={`text-[10px] mt-1 text-right ${
            isOwn ? "text-blue-100" : "text-gray-400"
          }`}
        >
          {formatTime(msg.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default Message;
