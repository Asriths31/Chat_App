import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "./socket";

const useSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Helper to add message to cache
    const addMessageToCache = (newMessage) => {
      queryClient.setQueryData(["messages"], (oldData) => {
        if (!oldData) return { success: true, data: [newMessage] };
        
        // check if message already exists (avoid duplicates)
        const exists = oldData.data.find((msg) => msg._id === newMessage._id);
        if (exists) return oldData;

        return {
          ...oldData,
          data: [...oldData.data, newMessage],
        };
      });
    };

    // listen for new messages from server (includes normal and system messages)
    socket.on("receive_message", (newMessage) => {
      console.log("Received new message via socket:", newMessage);
      addMessageToCache(newMessage);
    });

    // cleanup on unmount
    return () => {
      socket.off("receive_message");
    };
  }, [queryClient]);

  return socket;
};

export default useSocket;
