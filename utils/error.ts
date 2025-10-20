import { showMessage } from "react-native-flash-message";

const displayError = (error: any, display: boolean) => {
	let status = error?.response?.status;
	let message;
	if (error?.response?.data?.message) {
		console.log("Yeah");
		message = error.response.data.message;
	} else if (status === 500) {
		message = "Internal Server Error";
	} else if (status === 400) {
		message = "Bad Request";
	} else if (status === 410) {
		message = "Resource not available";
	} else if (status === 504) {
		message = "Timeout Error";
	} else if (typeof error === "string") {
		message = error;
	} else {
		message = "Server Error";
	}

	if (display) {
		showMessage({
			duration: 3000,
			message: "Oops!",
			description: message,
			type: "danger",
		});
	}
	return message;
};

const displaySuccess = (message: string, title?: string) => {
	showMessage({
		duration: 3000,
		message: title || "Great!",
		description: message,
		type: "success",
	});
};

export { displayError, displaySuccess };
