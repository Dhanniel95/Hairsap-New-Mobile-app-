import authService from "@/redux/auth/authService";
import { getUserInfo } from "@/redux/auth/authSlice";
import { displayError } from "@/utils/error";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
	ActivityIndicator,
	ImageBackground,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const LoginScreen = () => {
	const dispatch = useAppDispatch();

	const router = useRouter();

	const params = useLocalSearchParams();

	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		loginWithMagicLink();
	}, [params]);

	const loginWithMagicLink = async () => {
		if (params?.magic_token) {
			try {
				let res = await authService.magicLinkLogin(params.magic_token);
				if (res?.token) {
					await AsyncStorage.setItem("@accesstoken", res.token);
				}
				let user = res?.user;
				if (user?.userId) {
					dispatch(getUserInfo());
				}
				if (res.changePassword) {
					router.replace({
						pathname: "/(app)/changepassword",
						params: { new: "true" },
					});
				} else if (user?.userId && !user.faceIdPhotoUrl) {
					router.push({
						pathname: "/(auth)/faceverify",
						params: user,
					});
				} else if (user?.userId) {
					router.replace("/(tabs-user)/gallery");
				} else {
					router.replace("/(auth)/login");
				}
			} catch (err) {
				displayError(err, true);
				router.replace("/(auth)/login");
			}
		}
	};

	return (
		<ImageBackground
			source={require("../assets/images/hairsap_home.png")}
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
				{user?.userId ? (
					<TouchableOpacity>
						<Text>Access</Text>
					</TouchableOpacity>
				) : (
					<ActivityIndicator color={"#fff"} size={"large"} />
				)}
			</View>
		</ImageBackground>
	);
};

export default LoginScreen;
