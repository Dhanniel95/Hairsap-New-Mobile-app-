import colors from "@/utils/colors";
import { formatCurrency } from "@/utils/currency";
import { FontAwesome } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { useRouter } from "expo-router";
import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const RequestCard = ({ book }: { book: any }) => {
	const router = useRouter();

	return (
		<TouchableWithoutFeedback
			onPress={() =>
				router.push({
					pathname: "/(app)/activitybooks",
					params: { items: book },
				})
			}
		>
			<View style={[styles.container, { backgroundColor: colors.white }]}>
				<Image
					source={
						book?.user.faceIdPhotoUrl
							? {
									uri: book.user.faceIdPhotoUrl,
							  }
							: require("../../assets/images/profile.jpg")
					}
					style={[styles.image]}
				/>
				<View style={{ width: "75%" }}>
					<View style={styles.row}>
						<Text style={{ fontFamily: "bold" }}>
							{book?.user?.name}
						</Text>

						{book.pinStatus != null && (
							<FontAwesome name="thumb-tack" size={20} />
						)}
					</View>
					<Text
						numberOfLines={1}
						style={{
							color: colors.darkGray,
							fontFamily: "regular",
						}}
					>
						{book.pinDate == null
							? format(parseISO(book.createdAt), "do MMMM, yyyy")
							: format(parseISO(book.pinDate), "do MMMM, yyyy")}
					</Text>
					<View style={styles.bottomContainer}>
						<Text style={{ width: "69%", fontFamily: "regular" }}>
							{book?.invoice?.invoiceFees[0]?.name}
						</Text>
						<Text style={{ width: "29%", fontFamily: "regular" }}>
							₦{" "}
							{formatCurrency(
								book.invoice?.invoiceFees[0]?.price / 100
							)}
						</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 6,
		elevation: 2,
		shadowColor: "grey",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 15,
	},

	image: {
		height: 50,
		width: 50,
		borderRadius: 25,
	},

	bottomContainer: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});

export default RequestCard;
