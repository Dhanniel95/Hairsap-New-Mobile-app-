import { logOut } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/utils/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

const SettingsScreen = () => {
	const dispatch = useAppDispatch();

	const router = useRouter();

	const logoutHandler = async () => {
		dispatch(logOut());
		await AsyncStorage.removeItem("@accesstoken");
		router.replace("/(auth)/login");
	};

	return (
		<View>
			<Text>SettingsScreen</Text>
			<Button
				title="Log Out"
				onPress={() =>
					Alert.alert("Logout", "Are you sure you want to logout?", [
						{ text: "NO" },
						{ text: "LOGOUT", onPress: () => logoutHandler() },
					])
				}
			/>
		</View>
	);
};

export default SettingsScreen;

const styles = StyleSheet.create({});
