import colors from "@/utils/colors";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TransportBox = ({ transportAmount }: { transportAmount: any }) => {
	const [period, setPeriod] = useState("first");

	const amount =
		period == "first"
			? transportAmount?.secondHalf / 100 || 0
			: transportAmount?.firstHalf / 100 || 0;

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.periodToggle}
				onPress={() => {
					period == "first"
						? setPeriod("second")
						: setPeriod("first");
				}}
			>
				<Text style={styles.periodText}>
					{period == "first" ? "Current" : "Previous 2 weeks"}
				</Text>
			</TouchableOpacity>

			<Text style={styles.heading}>
				Your Bi-weekly Transport Earnings
			</Text>

			<View style={styles.row}>
				<Text style={styles.title}>Earnings</Text>
				<Text style={styles.amount}>
					₦{transportAmount ? amount.toLocaleString() : 0}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: 15,
		padding: 15,
		paddingHorizontal: 10,
		elevation: 2,
		shadowColor: "grey",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
	},

	periodToggle: {
		borderWidth: 1,
		borderRadius: 7,
		borderColor: colors.midGray,
		padding: 5,
		paddingHorizontal: 10,
		alignSelf: "flex-end",
	},

	periodText: {
		fontSize: 11,
		fontFamily: "regular",
	},

	heading: {
		fontSize: 15,
		fontFamily: "bold",
		paddingBottom: 5,
		borderBottomWidth: 1,
		borderBottomColor: colors.midGray,
		marginVertical: 5,
	},

	row: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 5,
	},

	title: {
		fontFamily: "medium",
		fontSize: 13,
	},

	amount: {
		fontFamily: "bold",
		fontSize: 14,
	},

	outer: {
		height: 5,
		borderRadius: 20,
		// width: "100%",
		overflow: "hidden",
		backgroundColor: colors.appGray,
		marginBottom: 20,
	},

	inner: {
		height: "100%",
		borderRadius: 20,
	},
});

export default TransportBox;
