const Message = ({ msg, currentUser }) => {
  if (msg.type === "system") {
    return (
      <div className="flex justify-center my-4 z-0">
        <span className="bg-gray-200/80 text-gray-500 border border-gray-200 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
          {msg.message}
        </span>
      </div>
    );
  }

  const isOwn = msg.username === currentUser;

  // format time like "2:30 PM"
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
          isOwn
            ? "bg-blue-500 text-white rounded-br-none shadow-md"
            : "bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100"
        }`}
      >
        {!isOwn && (
          <p className="text-xs font-bold text-blue-600 mb-1">
            {msg.username}
          </p>
        )}
        <p className="text-sm break-words leading-relaxed">{msg.message}</p>
        <p
          className={`text-[10px] mt-1.5 text-right font-medium ${
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
