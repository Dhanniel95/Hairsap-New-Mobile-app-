import Container from "@/components/Container";
import colors from "@/utils/colors";
import {
	Feather,
	FontAwesome,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
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
							<FontAwesome5
								color={color}
								size={22}
								name={"photo-video"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="messages"
					options={{
						title: "Consult",
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								color={color}
								size={22}
								name={"message-processing"}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="activity"
					options={{
						title: "Activity",
						tabBarIcon: ({ color }) => (
							<FontAwesome color={color} size={20} name="th" />
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
