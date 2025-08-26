import colors from "@/utils/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StatsBox = ({
	monthlyBooking,
	completedBooking,
}: {
	monthlyBooking: any;
	completedBooking: any;
}) => {
	const widthPercent = monthlyBooking ? monthlyBooking / 100000 : 5;
	const cWidthPercent = completedBooking ? completedBooking / 100000 : 5;

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Your Earnings</Text>

			<View style={styles.row}>
				<Text style={styles.title}>Booking Amount</Text>
				<Text style={styles.amount}>
					₦
					{monthlyBooking
						? (monthlyBooking / 100).toLocaleString()
						: 0}
				</Text>
			</View>

			<View style={styles.outer}>
				<View
					style={[
						styles.inner,
						{
							backgroundColor: colors.primary,
							width: `${widthPercent}%`,
						},
					]}
				/>
			</View>
			<View style={styles.row}>
				<Text style={styles.title}>Completed Booking Amount</Text>
				<Text style={styles.amount}>
					₦
					{completedBooking
						? (completedBooking / 100).toLocaleString()
						: 0}
				</Text>
			</View>

			<View style={styles.outer}>
				<View
					style={[
						styles.inner,
						{
							backgroundColor: colors.secondary,
							width: `${cWidthPercent}%`,
						},
					]}
				/>
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
		marginBottom: 20,
	},

	heading: {
		fontSize: 15,
		fontFamily: "bold",
		paddingBottom: 5,
		borderBottomWidth: 1,
		borderBottomColor: colors.midGray,
		marginBottom: 5,
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

export default StatsBox;
