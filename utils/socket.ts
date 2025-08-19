// socket.js
import { io } from "socket.io-client";
import baseUrl from "./config";

export const createSocket = (role: string, token: string) => {
	return io(baseUrl, {
		query: {
			role,
			token,
		},
		transports: ["websocket"],
		autoConnect: false, // we’ll control when it connects
	});
};
