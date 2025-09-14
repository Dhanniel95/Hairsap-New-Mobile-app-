import textStyles from "@/styles/textStyles";
import { formatCurrency } from "@/utils/currency";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EachAccepted = ({ booking }: { booking: any }) => {
	const router = useRouter();

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.card}
			onPress={() =>
				router.push({
					pathname: "/(app)/activitybooks",
					params: { itemId: booking.bookingId },
				})
			}
		>
			<View style={styles.top}>
				<Image
					source={
						booking?.user.faceIdPhotoUrl
							? {
									uri: booking.user.faceIdPhotoUrl,
							  }
							: require("../../assets/images/profile.jpg")
					}
					style={{
						height: 40,
						width: 40,
						borderRadius: 20,
					}}
				/>
				<Text
					style={[
						textStyles.textMid,
						{ fontSize: 14, marginLeft: 20 },
					]}
				>
					{booking?.user?.name}
				</Text>
			</View>
			<View style={{ marginTop: 15, paddingHorizontal: 20 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 10,
						flexWrap: "wrap",
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
							{ color: "#FFF", fontSize: 14, flexWrap: "wrap" },
						]}
					>
						{booking?.invoice?.invoiceFees[0].name}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 20,
						flexWrap: "wrap",
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
							booking?.invoice?.invoiceFees[0].price / 100
						)}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default EachAccepted;

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
		alignItems: "center",
		paddingVertical: 10,
	},
});
