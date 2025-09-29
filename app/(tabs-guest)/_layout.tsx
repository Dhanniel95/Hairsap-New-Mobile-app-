import Container from "@/components/Container";
import ModalComponent from "@/components/ModalComponent";
import GuestToUser from "@/components/User/GuestToUser";
import { logOut, saveUserData } from "@/redux/auth/authSlice";
import { saveChatId } from "@/redux/chat/chatSlice";
import { setSocketStatus } from "@/redux/socket/socketSlice";
import colors from "@/utils/colors";
import baseUrl from "@/utils/config";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { connectSocket, disconnectSocket } from "@/utils/socket";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Platform, TouchableOpacity } from "react-native";

export default function TabLayout() {
	const { user } = useAppSelector((state) => state.auth);

	const [openUser, setOpenUser] = useState(false);

	const router = useRouter();

	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		dispatch(saveChatId(""));
		router.replace("/(auth)/login");
		dispatch(logOut());
	};

	useEffect(() => {
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

		socket.on("auth:new-token", async (data) => {
			console.log(data?.data?.user, "USER");
			if (data?.data?.token) {
				await AsyncStorage.setItem("@accesstoken", data.data.token);
				dispatch(saveUserData(data.data.user));
				setOpenUser(true);
			}
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
					name="exit"
					options={{
						title: "Log In",
						tabBarIcon: ({ color }) => (
							<Feather name="log-in" size={22} color={color} />
						),
						tabBarButton: (props) => {
							return (
								<TouchableOpacity
									{...props}
									onPress={() => {
										Alert.alert(
											"Log In",
											"Log In to Hairsap to access more",
											[
												{
													text: "Cancel",
													style: "cancel",
												},
												{
													text: "Login",
													onPress: () =>
														logoutHandler(),
												},
											]
										);
									}}
								/>
							);
						},
					}}
				/>
			</Tabs>
			<ModalComponent open={openUser} closeModal={() => console.log("")}>
				<GuestToUser closeModal={() => setOpenUser(false)} />
			</ModalComponent>
		</Container>
	);
}
