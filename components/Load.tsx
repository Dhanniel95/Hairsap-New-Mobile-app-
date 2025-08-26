import colors from "@/utils/colors";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Load = () => {
	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<ActivityIndicator color={colors.primary} size={30} />
			</View>
		</View>
	);
};

export default Load;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
		alignItems: "center",
		justifyContent: "center",
	},
	box: {
		backgroundColor: "#FFF",
		borderWidth: 1.5,
		borderColor: "#FFF",
		height: 60,
		width: 60,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		elevation: 2,
		shadowRadius: 1,
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 0,
			height: 1,
		},
	},
});
