import colors from "@/utils/colors";
import { StyleSheet } from "react-native";

const textStyles = StyleSheet.create({
	textMid: {
		fontFamily: "medium",
		color: colors.dark,
		fontSize: 16,
	},
	textBold: {
		fontFamily: "bold",
		color: colors.dark,
		fontSize: 16,
	},
	text: {
		fontFamily: "regular",
		color: colors.dark,
		fontSize: 16,
	},
});

export default textStyles;
