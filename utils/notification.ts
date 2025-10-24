import authService from "@/redux/auth/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const registerForPushNotificationsAsync = async () => {
	// Ensure physical device
	if (!Device.isDevice) {
		console.log("Push notifications require a physical device.");
		return { deviceId: getDeviceId(), token: undefined };
	}

	try {
		// 1️⃣ Request Notification Permission
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== "granted") {
			console.warn("Notification permissions not granted.");
			return { deviceId: getDeviceId(), token: undefined };
		}

		// 2️⃣ Get Expo Push Token
		const { data: token } = await Notifications.getExpoPushTokenAsync();
		console.log("Expo Push Token:", token);

		// 3️⃣ Set Android notification channel
		if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}

		// 4️⃣ Save token to backend & local storage
		await authService.saveToken(token);
		await AsyncStorage.setItem("@savedPush", "yes");

		// 5️⃣ Return device info
		return { deviceId: getDeviceId(), token };
	} catch (error) {
		console.error("Failed to register for push notifications:", error);
		return { deviceId: getDeviceId(), token: undefined };
	}
};

// 🔹 Helper to get a consistent device ID
const getDeviceId = () => {
	return Device.osInternalBuildId || Device.osBuildId || "unknown-device";
};
