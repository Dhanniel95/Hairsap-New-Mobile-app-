// socket.js
import { io, Socket } from "socket.io-client";
import baseUrl from "./config";

let socket: Socket | null = null;

export const createSocket = (role: string, token: string) => {
	socket = io(baseUrl, {
		query: {
			role,
			token,
		},
		transports: ["websocket"],
		autoConnect: false, // we’ll control when it connects
	});
	return socket;
};

export const getSocket = () => socket;
