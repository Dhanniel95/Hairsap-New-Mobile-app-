import ButtonSettings from "@/components/Basics/ButtonSettings";
import authService from "@/redux/auth/authService";
import { logOut } from "@/redux/auth/authSlice";
import textStyles from "@/styles/textStyles";
import { displayError } from "@/utils/error";
import { useAppDispatch } from "@/utils/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";

const SettingsScreen = () => {
	const dispatch = useAppDispatch();

	const router = useRouter();

	const logoutHandler = async () => {
		dispatch(logOut());
		await AsyncStorage.removeItem("@accesstoken");
		router.replace("/(auth)/login");
	};

	const deactivateHandler = async () => {
		try {
			await authService.deactivateAccount();
			router.replace("/(auth)/landing");
		} catch (err) {
			displayError(err, true);
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#FFF" }}>
			<Text
				style={[
					textStyles.textBold,
					{ textAlign: "center", paddingVertical: 10, fontSize: 17 },
				]}
			>
				Settings
			</Text>
			<View style={{ flex: 1, paddingHorizontal: "8%" }}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ flex: 1, paddingTop: 20 }}>
						<ButtonSettings
							name="Change Password"
							iconName="face-man-profile"
							onPress={() => router.push("/(app)/changepassword")}
						/>
						<ButtonSettings
							name="Discount"
							iconName="percent"
							onPress={() => router.push("/(app)/discount")}
						/>
						<ButtonSettings
							name="Terms of Service"
							iconName="newspaper"
							onPress={() => console.log("")}
						/>
						<ButtonSettings
							name="Privacy Policy"
							iconName="shield-alert-outline"
							onPress={() => console.log("")}
						/>
						<ButtonSettings
							name="Log Out"
							iconName="logout"
							onPress={() =>
								Alert.alert(
									"Logout",
									"Are you sure you want to logout?",
									[
										{ text: "NO" },
										{
											text: "LOGOUT",
											onPress: () => logoutHandler(),
										},
									]
								)
							}
						/>
						<View style={{ height: 50 }} />
						<ButtonSettings
							name="Deactivate Account"
							iconName="cancel"
							onPress={() =>
								Alert.alert(
									"Deactivate Account",
									"Are you sure you want to deactivate your account?",
									[
										{ text: "NO" },
										{
											text: "Deactivate",
											onPress: () => deactivateHandler(),
											style: "destructive",
										},
									]
								)
							}
						/>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default SettingsScreen;
