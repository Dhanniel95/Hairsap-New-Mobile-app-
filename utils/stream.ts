import { Logger, StreamVideoClient } from "@stream-io/video-react-native-sdk";
import { apiRequest } from "./axiosInstance";
import { displayError } from "./error";

let client: StreamVideoClient | null = null;

const myLogger: Logger = (logLevel, message, ...args) => {
	// Do something with the log message
	console.log(logLevel, "LogLevel");
	console.log(message, "MEssage");
};

const tokenProvider = async () => {
	try {
		const { data } = await apiRequest().get(`/generate-call-token`);
		return data?.token;
	} catch (err) {
		console.log(displayError(err, false), "Error From Fetch TOKEN");
	}
};

export const initStreamClient = async (user: {
	id: string;
	image: string;
	name: string;
}) => {
	client = StreamVideoClient.getOrCreateInstance({
		apiKey: "2qnp99kyb7vj",
		user,
		tokenProvider,
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
