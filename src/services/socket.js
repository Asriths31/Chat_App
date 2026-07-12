import { io } from "socket.io-client";
import { baseURL } from "../api/chatApi";

const socket = io(baseURL);

export default socket;
