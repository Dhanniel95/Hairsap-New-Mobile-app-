import colors from "@/utils/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BookingRatioBox = ({
	totalBooking,
	newBooking,
	returnedBooking,
	progress,
	spending,
}: {
	totalBooking: any;
	newBooking: any;
	returnedBooking: any;
	progress: any;
	spending: any;
}) => {
	const widthPercent = newBooking ? (newBooking / totalBooking) * 100 : 5;
	const cWidthPercent = returnedBooking
		? (returnedBooking / totalBooking) * 100
		: 5;

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Completed Booking Ratio</Text>

			<View style={styles.row}>
				<Text style={styles.title}>
					New Bookings{" "}
					<Text style={styles.innerText}>(Customers)</Text>
				</Text>
				<Text style={styles.amount}>
					{progress
						? ((progress?.newCustomerProgress || 0) * 100).toFixed(
								2
						  )
						: 0}
					%
					<Text>
						(₦
						{((spending?.newCustomers || 0) / 100).toLocaleString()}
						)
					</Text>
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
				<Text style={styles.title}>
					Returned bookings{" "}
					<Text style={styles.innerText}>(Customers)</Text>
				</Text>
				<Text style={styles.amount}>
					{newBooking
						? (
								(progress?.returningCustomerProgress || 0) * 100
						  ).toFixed(2)
						: 0}
					%
					<Text>
						(₦
						{(
							(spending?.returningCustomers || 0) / 100
						).toLocaleString()}
						)
					</Text>
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

	innerText: {
		fontFamily: "regular",
		color: colors.mildGray,
		fontSize: 12,
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

export default BookingRatioBox;
