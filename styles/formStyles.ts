import colors from "@/utils/colors";
import { StyleSheet } from "react-native";

const formStyles = StyleSheet.create({
	input: {
		backgroundColor: "#FFFFFF",
		color: colors.dark,
		fontFamily: "medium",
		height: 50,
		paddingLeft: 20,
		borderRadius: 5,
		borderWidth: 1,
	},
	mainBtn: {
		backgroundColor: "#279E98",
		width: "100%",
		padding: 15,
		borderRadius: 6,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
});

export default formStyles;
