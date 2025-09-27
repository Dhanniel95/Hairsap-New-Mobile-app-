import Container from "@/components/Container";
import { getUserInfo } from "@/redux/auth/authSlice";
import { setSocketStatus } from "@/redux/socket/socketSlice";
import colors from "@/utils/colors";
import baseUrl from "@/utils/config";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { connectSocket, disconnectSocket } from "@/utils/socket";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

export default function TabLayout() {
	const dispatch = useAppDispatch();

	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getUserInfo());
		connectToSocket();

		return () => {
			disconnectSocket();
		};
	}, []);

	const connectToSocket = async () => {
		const token = (await AsyncStorage.getItem("@accesstoken")) || "";

		const socket = connectSocket(baseUrl, token, user.role);

		socket.on("connect", () => {
			console.log("Connected");
			dispatch(setSocketStatus("connected"));
		});

		socket.on("disconnect", () => {
			console.log("Disconnected");
			dispatch(setSocketStatus("disconnected"));
		});

		socket.on("connect_error", (err) => {
			console.log("Error With Connection", err);
			dispatch(setSocketStatus("disconnected"));
		});
	};

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
					name="gallery"
					options={{
						title: "Gallery",
						tabBarIcon: ({ color }) => (
							<Feather color={color} size={22} name={"image"} />
						),
					}}
				/>
				<Tabs.Screen
					name="consult"
					options={{
						title: "Consult",
						tabBarIcon: ({ color }) => (
							<Feather
								color={color}
								size={22}
								name={"message-square"}
							/>
						),
						tabBarStyle: {
							display: "none",
						},
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
