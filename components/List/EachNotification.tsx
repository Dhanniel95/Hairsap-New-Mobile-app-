import colors from "@/utils/colors";
import { format, parseISO } from "date-fns";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EachNotification = ({ item }: { item: any }) => {
	return (
		<View style={styles.container}>
			<View style={styles.txtContainer}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.date}>
					{format(parseISO(item.createdAt), "do MMMM, yyyy")}
				</Text>
			</View>
			<Text
				style={{ color: colors.mediumGray, fontFamily: "regular" }}
				numberOfLines={3}
			>
				{item.body}
			</Text>
		</View>
	);
};

export default EachNotification;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		borderRadius: 6,
		elevation: 2,
		shadowColor: "grey",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		backgroundColor: colors.white,
		padding: 13,
		marginBottom: 25,
	},

	txtContainer: {
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
		marginBottom: 10,
		alignItems: "center",
	},

	title: {
		color: colors.black,
		fontFamily: "bold",
		width: "57%",
		fontSize: 15,
	},
	date: {
		color: colors.mildGray,
		fontSize: 11,
		width: "40%",
		fontFamily: "regular",
	},
});
