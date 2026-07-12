import { io } from "socket.io-client";
import { baseURL } from "./chatApi";

const socket = io(baseURL);

export default socket;
