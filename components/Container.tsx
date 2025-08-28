import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = ({
	children,
	bg,
	dark,
}: {
	children: React.ReactNode;
	bg?: string;
	dark?: boolean;
}) => {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: bg || "#FFF", paddingTop: insets.top },
			]}
		>
			{children}
			<ExpoStatusBar style={dark ? "dark" : "light"} />
		</View>
	);
};

export default Container;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
