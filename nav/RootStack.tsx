import { useAppSelector } from "@/utils/hooks";
import { Stack } from "expo-router";
import React from "react";

const RootStack = () => {
	const { user } = useAppSelector((state) => state.auth);

	console.log(user, "USER");

	return (
		<Stack screenOptions={{ headerShown: false }}>
			{user?.userId ? (
				<Stack.Screen name="(tabs)" />
			) : (
				<Stack.Screen name="(auth)" />
			)}
		</Stack>
	);
};

export default RootStack;
