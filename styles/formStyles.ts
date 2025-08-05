import { StyleSheet } from "react-native";

const formStyles = StyleSheet.create({
	input: {
		backgroundColor: "#FFFFFF",
		color: "#000",
		fontFamily: "Roboto-SemiBold",
		height: 50,
		paddingLeft: 20,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "rgba(26,23,134,0.8)",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 2,
	},
	mainBtn: {
		backgroundColor: "#279E98",
		width: "100%",
		padding: 15,
		borderRadius: 6,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderWidth: 1,
		borderColor: "#279E98",
	},
});

export default formStyles;
