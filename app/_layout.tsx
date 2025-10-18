import store from "@/redux/store";
import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

Sentry.init({
	dsn: "https://90cce3b73e5e4d6ecca87e4735a2222e@o4510068879392768.ingest.us.sentry.io/4510068961771520",

	// Adds more context data to events (IP address, cookies, user, etc.)
	// For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
	sendDefaultPii: true,

	// Enable Logs
	enableLogs: true,

	// Configure Session Replay
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [Sentry.mobileReplayIntegration()],

	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: __DEV__,
});

const persistor = persistStore(store);

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
		shouldShowBanner: true,
		shouldShowList: true,
	}),
});

export default Sentry.wrap(function RootLayout() {
	const [loaded] = useFonts({
		regular: require("../assets/fonts/Poppins-Regular.ttf"),
		medium: require("../assets/fonts/Poppins-Medium.ttf"),
		bold: require("../assets/fonts/Poppins-Bold.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
			SystemUI.setBackgroundColorAsync("#000000");
		}
	}, [loaded]);

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Stack screenOptions={{ headerShown: false }} />
				<FlashMessage
					position="top"
					floating={true}
					textStyle={{ marginBottom: 5 }}
					style={{ marginTop: 40 }}
					titleStyle={{ marginTop: 10 }}
				/>
			</PersistGate>
		</Provider>
	);
});
