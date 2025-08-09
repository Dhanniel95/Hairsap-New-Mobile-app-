import Container from "@/components/Container";
import { getUserInfo } from "@/redux/auth/authSlice";
import colors from "@/utils/colors";
import { useAppDispatch } from "@/utils/hooks";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

export default function TabLayout() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserInfo());
	}, []);

	return (
		<Container dark={true}>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: colors.primary,
					tabBarInactiveTintColor: colors.dark,
					headerShown: false,
					tabBarStyle: Platform.select({
						ios: {
							position: "absolute",
						},
						default: {},
					}),
					tabBarLabelStyle: {
						fontFamily: "medium",
					},
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Gallery",
						tabBarIcon: ({ color }) => (
							<Feather color={color} size={22} name={"image"} />
						),
					}}
				/>
				<Tabs.Screen
					name="messages"
					options={{
						title: "Consult",
						tabBarIcon: ({ color }) => (
							<Feather
								color={color}
								size={22}
								name={"message-square"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						tabBarIcon: ({ color }) => (
							<Feather color={color} size={20} name="user" />
						),
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						tabBarIcon: ({ color }) => (
							<Feather color={color} size={22} name="settings" />
						),
					}}
				/>
			</Tabs>
		</Container>
	);
}
