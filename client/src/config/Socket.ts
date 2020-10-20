import socketIOClient from "socket.io-client";
import "dotenv/config";

export const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT!);
