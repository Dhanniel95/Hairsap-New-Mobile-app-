import { logOut } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/utils/hooks";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const HomeTab = () => {
	const dispatch = useAppDispatch();

	return (
		<View>
			<Text>HomeTab</Text>
			<Button title="Logout" onPress={() => dispatch(logOut())} />
		</View>
	);
};

export default HomeTab;

const styles = StyleSheet.create({});
