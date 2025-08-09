import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import basicService from "@/redux/basic/basicService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { useAppSelector } from "@/utils/hooks";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DiscountScreen = () => {
	const [amount, setAmount] = useState(0);

	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		getDiscount();
	}, []);

	const getDiscount = async () => {
		try {
			let res = await basicService.getDiscount();
			if (res?.discountAmount) {
				setAmount(res.discountAmount);
			}
		} catch (err) {}
	};

	return (
		<Container dark={true} bg="#FFF">
			<GoBack
				bgColor={colors.dark}
				iconColor={colors.white}
				title="Discounts"
			/>
			<View
				style={{
					flex: 1,
					paddingHorizontal: "8%",
					paddingVertical: 40,
				}}
			>
				<View style={styles.textBox}>
					<Text style={[textStyles.text, { fontSize: 14 }]}>
						You can share your referral code with friends and family
						for ₦{amount.toLocaleString()} discount.
					</Text>
					<Text style={[textStyles.text, { fontSize: 14 }]}>
						NB: The more referral, the more discount.
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginVertical: 20,
					}}
				>
					<View style={styles.refCode}>
						<Text
							style={{
								fontFamily: "regular",
								fontSize: 14,
								marginBottom: 3,
							}}
						>
							Your referral code
						</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginVertical: 20,
							}}
						>
							<Text style={{ fontSize: 14, fontFamily: "bold" }}>
								{user.discountCode}
							</Text>

							<TouchableOpacity
								onPress={async () =>
									await Clipboard.setStringAsync(
										`${user.discountCode}`
									)
								}
							>
								<Ionicons
									size={23}
									color={colors.black}
									name="copy"
								/>
							</TouchableOpacity>
						</View>
					</View>

					<TouchableOpacity
						style={styles.shareContainer}
						onPress={() =>
							Share.share({
								message: `Use this code “${
									user.discountCode
								}” for ₦${amount.toLocaleString()} discount off your booking as a new customer`,
							})
						}
					>
						<Ionicons
							name="share-social"
							color={colors.white}
							size={20}
						/>
						<Text style={styles.share}>Share</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Container>
	);
};

export default DiscountScreen;

const styles = StyleSheet.create({
	textBox: {
		width: "100%",
		backgroundColor: colors.appGray,
		padding: 15,
		borderRadius: 15,
		marginBottom: 20,
	},
	refCode: {
		borderWidth: 1,
		borderStyle: "dashed",
		borderRadius: 15,
		backgroundColor: "#c7efedd6",
		padding: 10,
		width: "60%",
	},
	shareContainer: {
		backgroundColor: colors.primary,
		width: "37%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderRadius: 20,
	},

	share: {
		color: colors.white,
		marginLeft: 5,
	},
});
