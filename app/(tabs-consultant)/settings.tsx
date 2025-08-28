import ButtonSettings from "@/components/Basics/ButtonSettings";
import { logOut } from "@/redux/auth/authSlice";
import { saveChatId } from "@/redux/chat/chatSlice";
import textStyles from "@/styles/textStyles";
import { useAppDispatch } from "@/utils/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";

const SettingsScreen = () => {
	const dispatch = useAppDispatch();

	const router = useRouter();

	const logoutHandler = async () => {
		dispatch(saveChatId(""));
		dispatch(logOut());
		await AsyncStorage.removeItem("@accesstoken");
		router.replace("/(auth)/login");
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
							name="Terms of Service"
							iconName="newspaper"
							onPress={() => router.push("/(app)/terms")}
						/>
						<ButtonSettings
							name="Privacy Policy"
							iconName="shield-alert-outline"
							onPress={() => router.push("/(app)/policy")}
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
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default SettingsScreen;
