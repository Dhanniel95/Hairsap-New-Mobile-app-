import colors from "@/utils/colors";
import { StyleSheet } from "react-native";

const formStyles = StyleSheet.create({
	input: {
		backgroundColor: colors.appGray,
		color: colors.dark,
		fontFamily: "medium",
		height: 50,
		paddingLeft: 20,
		borderRadius: 5,
	},
	mainBtn: {
		backgroundColor: "#279E98",
		width: "100%",
		paddingVertical: 20,
		borderRadius: 6,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
});

export default formStyles;
