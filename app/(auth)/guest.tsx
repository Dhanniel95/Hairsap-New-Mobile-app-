import { loginGuest } from "@/redux/auth/authSlice";
import { displayError } from "@/utils/error";
import { useAppDispatch } from "@/utils/hooks";
import { registerForPushNotificationsAsync } from "@/utils/notification";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, ImageBackground, View } from "react-native";

const GuestCheckScreen = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	useEffect(() => {
		const setup = async () => {
			const values = await registerForPushNotificationsAsync();
			if (values) {
				registerGuest(values.deviceId, values.token);
			}
		};

		setup();
	}, []);

	const registerGuest = async (deviceId: any, token: any) => {
		try {
			let payload = {
				deviceId,
				token,
				role: "guest",
			};
			let res = await dispatch(loginGuest(payload)).unwrap();
			if (res?.userId) {
				router.replace("/(tabs-guest)/gallery");
			}
		} catch (err) {
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
			</View>
		</ImageBackground>
	);
};

export default GuestCheckScreen;
