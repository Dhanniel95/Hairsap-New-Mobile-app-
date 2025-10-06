import textStyles from "@/styles/textStyles";
import { formatCommas } from "@/utils/currency";
import { formatTime } from "@/utils/datetime";
import { format, isValid, parseISO } from "date-fns";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BorderDashed from "../Basics/BorderDashed";

const ReceiptChat = ({
	metadata,
	isUser,
}: {
	metadata: any;
	isUser: boolean;
}) => {
	const pinDate = metadata?.pinDate ? parseISO(metadata.pinDate) : new Date();

	return metadata?.serviceBooked ? (
		<View
			style={{
				flexDirection: isUser ? "row-reverse" : "row",
			}}
			pointerEvents="box-none"
		>
			<View style={[styles.card]} pointerEvents="box-none">
				<View style={styles.top}>
					<Text
						style={[
							textStyles.textBold,
							{ fontSize: 14, color: "#334155" },
						]}
					>
						Booking Summary
					</Text>
				</View>
				<View
					style={{
						paddingVertical: 10,
						alignItems: "flex-end",
					}}
				>
					<View
						style={{
							width: "80%",
							paddingRight: 5,
						}}
					>
						<View>
							<Text
								style={[
									textStyles.textBold,
									{
										color: "#FFF",
										fontSize: 14,
										marginBottom: 5,
									},
								]}
							>
								STYLE:{" "}
								<Text style={{ fontFamily: "regular" }}>
									{metadata.serviceBooked}
								</Text>
							</Text>
							<Text
								style={[
									textStyles.textBold,
									{
										color: "#FFF",
										fontSize: 14,
										marginBottom: 5,
									},
								]}
							>
								PRICE:{" "}
								<Text style={{ fontFamily: "regular" }}>
									₦
									{formatCommas((metadata?.price || 0) / 100)}
								</Text>
							</Text>
							<Text
								style={[
									textStyles.textBold,
									{
										color: "#FFF",
										fontSize: 14,
										marginBottom: 5,
									},
								]}
							>
								DURATION:{" "}
								<Text style={{ fontFamily: "regular" }}>
									{formatTime(metadata.estimatedDuration)}
								</Text>
							</Text>
						</View>
					</View>
				</View>
				<BorderDashed color="#FFF" width={2} />
				<View style={{ paddingVertical: 10, paddingLeft: 10 }}>
					<Text
						style={[
							textStyles.textBold,
							{
								color: "#FFF",
								fontSize: 14,
								marginBottom: 5,
							},
						]}
					>
						DATE:{" "}
						<Text style={{ fontFamily: "regular" }}>
							{isValid(pinDate)
								? format(pinDate, "do MMMM, yyyy")
								: "Invalid date"}
						</Text>
					</Text>
					<Text
						style={[
							textStyles.textBold,
							{
								color: "#FFF",
								fontSize: 14,
							},
						]}
					>
						TIME:{" "}
						<Text style={{ fontFamily: "regular" }}>
							{isValid(pinDate)
								? format(pinDate, "h:mm a")
								: "Invalid date"}
						</Text>
					</Text>
				</View>
				<BorderDashed color="#FFF" width={2} />
				<View
					style={{
						paddingVertical: 10,
						alignItems: "flex-end",
						paddingRight: 10,
					}}
				>
					<Text
						style={[
							textStyles.textBold,
							{
								color: "#FFF",
								fontSize: 14,
								width: "100%",
								textAlign: "right",
								marginBottom: 5,
							},
						]}
					>
						NAME:{" "}
						<Text
							style={{
								fontFamily: "regular",
								textTransform: "uppercase",
							}}
						>
							{metadata.user?.name}
						</Text>
					</Text>
					<Text
						style={[
							textStyles.textBold,
							{
								color: "#FFF",
								fontSize: 14,
								width: "100%",
								textAlign: "right",
							},
						]}
					>
						BOOKING CODE:{" "}
						<Text
							style={{
								fontFamily: "regular",
								textTransform: "uppercase",
							}}
						>
							{metadata.bookingCode}
						</Text>
					</Text>
				</View>
				<BorderDashed color="#FFF" width={2} />
				<View style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
					<Text
						style={[
							textStyles.textBold,
							{
								fontSize: 11,
								color: "#FFF",
								textTransform: "uppercase",
							},
						]}
					>
						Appointment Booking Deposit:{" "}
						<Text style={{ fontFamily: "regular" }}>
							₦
							{formatCommas(
								(metadata.appointmentBalance || 0) / 100
							)}
						</Text>
					</Text>
					<Text
						style={[
							textStyles.textBold,
							{
								fontSize: 11,
								color: "#FFF",
								textTransform: "uppercase",
							},
						]}
					>
						Outstanding Booking Deposit:{" "}
						<Text style={{ fontFamily: "regular" }}>
							₦
							{formatCommas(
								(metadata.appointmentDeposit || 0) / 100
							)}
						</Text>
					</Text>
				</View>
				<View
					style={{
						backgroundColor: "#1F2937",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						paddingVertical: 15,
						paddingHorizontal: 10,
						borderBottomRightRadius: 20,
						borderBottomLeftRadius: 20,
					}}
				>
					<Text
						style={[
							textStyles.text,
							{ fontSize: 12, color: "#FFF" },
						]}
					>
						Total Service Price
					</Text>
					<Text style={[textStyles.textBold, { color: "#FFF" }]}>
						₦{formatCommas((metadata?.price || 0) / 100)}
					</Text>
				</View>
			</View>
		</View>
	) : (
		<View style={{ flexDirection: isUser ? "row-reverse" : "row" }} />
	);
};

export default ReceiptChat;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#6B7280",
		marginVertical: 10,
		borderTopLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
		width: "90%",
	},
	top: {
		backgroundColor: "#FFF",
		borderWidth: 1,
		borderColor: "#6B7280",
		alignItems: "flex-end",
		justifyContent: "flex-end",
		paddingVertical: 10,
		paddingRight: 10,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderTopRightRadius: 0,
	},
	border: {
		borderWidth: 1,
		borderColor: "red",
		borderStyle: "dashed",
		borderRadius: 2,
		borderLeftWidth: 0,
	},
});
