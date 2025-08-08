import store from "@/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		regular: require("../assets/fonts/Poppins-Regular.ttf"),
		medium: require("../assets/fonts/Poppins-Medium.ttf"),
		bold: require("../assets/fonts/Poppins-Bold.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
			SystemUI.setBackgroundColorAsync("#000");
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
}
