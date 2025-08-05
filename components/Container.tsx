import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

const Container = ({
	children,
	bg,
	dark,
}: {
	children: React.ReactNode;
	bg?: string;
	dark?: boolean;
}) => {
	return (
		<>
			<SafeAreaView
				style={{
					flex: 0,
					backgroundColor: bg || "#FFF",
				}}
			/>
			<SafeAreaView
				style={[
					styles.container,
					{
						backgroundColor: bg || "#FFF",
					},
				]}
			>
				{children}
			</SafeAreaView>
			<SafeAreaView
				style={{
					flex: 0,
					backgroundColor: bg || "#FFF",
				}}
			/>
			<ExpoStatusBar style={dark ? "dark" : "light"} />
		</>
	);
};

export default Container;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: StatusBar.currentHeight,
	},
});
