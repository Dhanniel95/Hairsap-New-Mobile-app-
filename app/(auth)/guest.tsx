import { loginGuest } from "@/redux/auth/authSlice";
import textStyles from "@/styles/textStyles";
import { displayError } from "@/utils/error";
import { useAppDispatch } from "@/utils/hooks";
import { registerForPushNotificationsAsync } from "@/utils/notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";

const GuestCheckScreen = () => {
	const router = useRouter();

	const [loadState, setLoadState] = useState("token");

	const dispatch = useAppDispatch();

	useEffect(() => {
		resetVersion();
	}, []);

	const resetVersion = async () => {
		const appVersion = Application.nativeApplicationVersion ?? "0.0.0";
		const savedVersion = "1.6.7";

		if (savedVersion <= appVersion) {
			await AsyncStorage.clear();
		}
		setup();
	};

	const setup = async () => {
		const values = await registerForPushNotificationsAsync();
		if (values) {
			registerGuest(values.deviceId, values.token);
		} else {
			displayError("An error has occured. Please Contact Admin", true);
		}
	};

	const registerGuest = async (deviceId: any, token: any) => {
		try {
			setLoadState("load");
			let payload = {
				deviceId,
				token: token || undefined,
				role: "guest",
			};
			let res = await dispatch(loginGuest(payload)).unwrap();
			if (res?.userId) {
				router.replace("/(tabs-guest)/gallery");
			} else {
				router.replace("/(auth)/login");
			}
		} catch (err) {
			router.replace("/(auth)/login");
			displayError(err, true);
		}
	};

	return (
		<ImageBackground
			source={require("../../assets/images/hairsap_home.png")}
			resizeMode="cover"
			style={{ flex: 1 }}
		>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator color={"#fff"} size={"large"} />
				<Text
					style={[
						textStyles.text,
						{ fontSize: 12, color: "#FFF", marginTop: 5 },
					]}
				>
					{loadState === "load"
						? "Please Wait..."
						: "Getting App Info..."}
				</Text>
			</View>
		</ImageBackground>
	);
};

export default GuestCheckScreen;
