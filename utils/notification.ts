import authService from "@/redux/auth/authService";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Function to get Device ID and Push Token
const registerForPushNotificationsAsync = async () => {
	let token;

	// Make sure it's a physical device
	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		// Ask permission if not granted
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}

		// ✅ Get Expo Push Token
		token = (await Notifications.getExpoPushTokenAsync()).data;
		try {
			await authService.saveToken(token);
		} catch (err) {}
	} else {
		console.log("Must use physical device for Push Notifications");
	}

	// ✅ Get Device ID (installation ID)
	const deviceId = Device.osInternalBuildId || Device.osBuildId;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	return { deviceId, token };
};

export { registerForPushNotificationsAsync };
