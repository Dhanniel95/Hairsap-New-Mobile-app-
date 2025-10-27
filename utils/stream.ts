import { Logger, StreamVideoClient } from "@stream-io/video-react-native-sdk";

let client: StreamVideoClient | null = null;

const myLogger: Logger = (logLevel, message, ...args) => {
	// Do something with the log message
	console.log(logLevel, "LogLevel");
	console.log(message, "MEssage");
};

export const initStreamClient = async (
	user: { id: string; image: string; name: string },
	token: string
) => {
	client = StreamVideoClient.getOrCreateInstance({
		apiKey: "jhx59nd3q6ys",
		user,
		token,
		options: {
			maxConnectUserRetries: 3,
			onConnectUserError: (err: Error, allErrors: Error[]) => {
				console.error("Failed to connect user", err, allErrors);
			},
			rejectCallWhenBusy: true,
			logLevel: "error",
		},
	});
	return client;
};

export const getStreamClient = () => client;

export const disconnectFromStream = async () => {
	await client?.disconnectUser();
};
