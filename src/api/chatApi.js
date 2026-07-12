import axios from "axios";


export const baseURL="https://chat-app-server-w5ez.onrender.com"
//export const baseURL="http://localhost:2000"


const chatApi = axios.create({
  baseURL:`${baseURL}/api`
});

// fetch all messages
export const fetchMessages = async () => {
  const response = await chatApi.get("/messages");
  return response.data;
};

// send a message (used as fallback, socket handles this mostly)
export const postMessage = async (data) => {
  const response = await chatApi.post("/messages", data);
  return response.data;
};

export default chatApi;
