import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { formatCurrency } from "@/utils/currency";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EachBooking = ({ booking }: { booking: any }) => {
	return (
		<View style={styles.card}>
			<View style={styles.top}>
				<Text style={[textStyles.textMid, { fontSize: 14 }]}>
					Booking Summary
				</Text>
				<TouchableOpacity>
					<Feather name="edit" size={20} color={colors.dark} />
				</TouchableOpacity>
			</View>
			<View style={{ marginTop: 15, paddingHorizontal: 20 }}>
				{Array.isArray(booking.bookedSubServices) &&
					booking.bookedSubServices.map((book: any) => (
						<View key={book.subService?.subServiceId}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 10,
								}}
							>
								<Text
									style={[
										textStyles.textBold,
										{
											color: "#FFF",
											fontSize: 14,
											marginRight: 5,
										},
									]}
								>
									STYLE:
								</Text>
								<Text
									style={[
										textStyles.textMid,
										{ color: "#FFF", fontSize: 14 },
									]}
								>
									{book.subService?.name}
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 10,
								}}
							>
								<Text
									style={[
										textStyles.textBold,
										{
											color: "#FFF",
											fontSize: 14,
											marginRight: 5,
										},
									]}
								>
									PRICE:
								</Text>
								<Text
									style={[
										textStyles.textMid,
										{ color: "#FFF", fontSize: 14 },
									]}
								>
									₦
									{formatCurrency(
										book.subService?.price / 100
									)}
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginBottom: 20,
								}}
							>
								<Text
									style={[
										textStyles.textBold,
										{
											color: "#FFF",
											fontSize: 14,
											marginRight: 5,
										},
									]}
								>
									ESTIMATED DURATION:
								</Text>
								<Text
									style={[
										textStyles.textMid,
										{ color: "#FFF", fontSize: 14 },
									]}
								>
									{book.subService?.duration}
								</Text>
							</View>
						</View>
					))}
			</View>
		</View>
	);
};

export default EachBooking;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#6B7280",
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		marginBottom: 20,
	},
	top: {
		backgroundColor: "#FFF",
		borderWidth: 1,
		borderColor: "#6B7280",
		borderRadius: 20,
		paddingHorizontal: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
	},
});
