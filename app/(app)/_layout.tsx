import { Stack } from "expo-router";
import React from "react";

const AppLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="changepassword" />
		</Stack>
	);
};

export default AppLayout;
