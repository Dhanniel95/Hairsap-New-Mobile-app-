import Container from "@/components/Container";
import { logOut } from "@/redux/auth/authSlice";
import colors from "@/utils/colors";
import { useAppDispatch } from "@/utils/hooks";
import { Feather } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Alert, Platform, TouchableOpacity } from "react-native";

export default function TabLayout() {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		router.replace("/(auth)/register");
		dispatch(logOut());
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
						title: "SignUp",
						tabBarIcon: ({ color }) => (
							<Feather name="log-out" size={22} color={color} />
						),
						tabBarButton: (props) => {
							return (
								<TouchableOpacity
									{...props}
									onPress={() => {
										Alert.alert(
											"Sign Up",
											"Do you want to sign up?",
											[
												{
													text: "Cancel",
													style: "cancel",
												},
												{
													text: "Yes",
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
		</Container>
	);
}
