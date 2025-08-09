import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { numberWithCommas } from "@/utils/currency";
import { useAppSelector } from "@/utils/hooks";
import { format, parseISO } from "date-fns";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EachTransaction = ({ item }: { item: any }) => {
	const { user } = useAppSelector((state) => state.auth);

	return (
		<View style={styles.container}>
			<View style={styles.letterContainer}>
				<Text style={[textStyles.text]}>
					{user.role === "user"
						? item.pro?.name?.charAt(0)
						: item.user?.name?.charAt(0)}
				</Text>
			</View>
			<View style={styles.txtContainer}>
				<Text style={styles.title}>
					{user.role === "user" ? item.pro?.name : item.user?.name}
				</Text>
				<Text style={styles.date}>
					{item.completedAt
						? format(parseISO(item.completedAt), "do MMMM, yyyy")
						: "Nil"}
				</Text>
			</View>
			<View style={[styles.txtContainer2, { alignItems: "flex-end" }]}>
				<Text style={styles.date}>{item.service?.name}</Text>
				<Text style={styles.title}>
					₦ {numberWithCommas(item.total / 100)}
				</Text>
			</View>
		</View>
	);
};

export default EachTransaction;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		borderRadius: 6,
		elevation: 2,
		shadowColor: "grey",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		backgroundColor: colors.white,
		alignItems: "center",
		justifyContent: "space-between",
		padding: 13,
		marginBottom: 25,
	},
	letterContainer: {
		height: 50,
		width: 50,
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		marginRight: 10,
		backgroundColor: colors.lightGreen,
	},
	txtContainer: {
		width: "45%",
	},
	txtContainer2: {
		width: "30%",
		justifyContent: "space-between",
	},
	title: {
		color: colors.black,
		fontFamily: "bold",
		marginBottom: 3,
	},
	date: {
		color: colors.mildGray,
		fontFamily: "regular",
		fontSize: 13,
	},
});
