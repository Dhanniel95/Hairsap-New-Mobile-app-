import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import SkeletonLoad from "@/components/SkeletonLoad";
import bookService from "@/redux/book/bookService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { formatCurrency } from "@/utils/currency";
import {
	Feather,
	FontAwesome,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { format } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const ActivityBookings = () => {
	const params = useLocalSearchParams();

	const [bookingData, setBookingData] = useState<any>({});
	const [invoice, setInvoice] = useState<any>({});
	const [transportation, setTransportation] = useState(0);
	const [sub, setSub] = useState<any>([]);
	const [price, setPrice] = useState(0);
	const [pinState, setPinState] = useState("");
	const [load, setLoad] = useState(false);
	const [service, setService] = useState<any>({});

	useEffect(() => {
		loadBookingInfo();
		getTransport();
	}, []);

	const getTransport = async () => {
		try {
			let res = await bookService.transportInfo();
			if (res?.price) {
				setTransportation(res.price / 100);
			}
		} catch (err) {}
	};

	const loadBookingInfo = async () => {
		try {
			setLoad(true);
			let res = await bookService.loadBookingData(params?.itemId || "");
			if (res?.user) {
				setService(res?.bookedSubServices[0]?.subService);
				setBookingData(res);
				setSub(
					res?.bookedSubServices?.filter((value: any) => {
						return (
							value.subService.name !=
							invoice?.invoiceFees?.[0]?.name
						);
					}) || []
				);
				setInvoice(res.invoice);
				setPinState(res.pinStatus);
				setPrice(
					res?.invoice?.invoiceFees?.reduce(
						(accumulator: any, object: any) => {
							return accumulator + object.price / 100;
						},
						0
					)
				);
			}
		} catch (err) {
			setLoad(false);
		}
	};

	const isPermitted = () => {
		if (bookingData.pinDate) {
			const now = new Date();
			const target = new Date(bookingData.pinDate);

			const startTime = new Date(target.getTime() - 60 * 60 * 1000);
			const endTime = new Date(target.getTime() + 23 * 60 * 60 * 1000);

			if (now >= startTime && now <= endTime) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	return (
		<Container dark={true} bg="#FFF">
			<GoBack
				bgColor={colors.dark}
				iconColor={colors.white}
				title={"Activity"}
			/>
			{bookingData?.user ? (
				<View
					style={{
						flex: 1,
						paddingHorizontal: 20,
						paddingVertical: 25,
					}}
				>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.topContainer}>
							<Image
								style={{
									height: 70,
									width: 70,
									borderRadius: 35,
								}}
								source={
									bookingData?.user?.faceIdPhotoUrl == null
										? require("../../assets/images/profile.jpg")
										: {
												uri: bookingData?.user
													?.faceIdPhotoUrl,
										  }
								}
							/>
							<View style={{ marginLeft: 10 }}>
								<Text style={[textStyles.textBold]}>
									From {bookingData?.user?.name}
								</Text>
								<Text
									style={[
										textStyles.text,
										{ fontSize: 13, marginTop: 4 },
									]}
								>
									Booked on{" "}
									{format(
										bookingData.updatedAt,
										"do MMMM, yyyy"
									)}
								</Text>
							</View>
						</View>
						<View
							style={[
								{
									marginBottom: 20,
									flexDirection: "row",
									justifyContent: "space-between",
								},
							]}
						>
							<TouchableOpacity
								style={styles.btn}
								disabled={!isPermitted()}
								onPress={() => {
									Linking.openURL(
										`tel:${bookingData?.user?.phone}`
									);
								}}
							>
								<FontAwesome
									name="phone"
									size={22}
									color={"#FFF"}
								/>
								<Text
									style={[
										textStyles.textMid,
										{
											color: "#FFF",
											fontSize: 14,
											marginLeft: 10,
										},
									]}
								>
									Call Customer
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.btn}
								onPress={() => {
									Linking.openURL(
										`tel:${bookingData?.user?.phone}`
									);
								}}
							>
								<Feather
									color={"#FFF"}
									size={22}
									name={"message-square"}
								/>
								<Text
									style={[
										textStyles.textMid,
										{
											color: "#FFF",
											fontSize: 14,
											marginLeft: 10,
										},
									]}
								>
									Consultant
								</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.line}>
							<Text
								style={[
									textStyles.textMid,
									{
										color: colors.mildGray,
										fontSize: 14,
										marginBottom: 2,
									},
								]}
							>
								Customer's Address:
							</Text>
							<Text style={[textStyles.textMid]}>
								{bookingData?.address}
							</Text>
							<Text style={[textStyles.text, { marginTop: 3 }]}>
								<MaterialCommunityIcons
									name="map-marker"
									color={colors.primary}
									size={20}
								/>{" "}
								{(
									bookingData?.invoice?.distance || 0 / 1000
								).toFixed(1)}{" "}
								km away
							</Text>
						</View>
						<View style={styles.line}>
							<Text
								style={[
									textStyles.textMid,
									{
										color: colors.mildGray,
										fontSize: 14,
										marginBottom: 2,
									},
								]}
							>
								Booking Type:
							</Text>
							<Text style={[textStyles.textMid]}>
								{bookingData?.assistants?.length > 0
									? "VIP Service"
									: "Regular Premium"}
							</Text>
						</View>
						<View
							style={[
								styles.line,
								{
									flexDirection: "row",
									alignItems: "center",
									flexWrap: "wrap",
								},
							]}
						>
							<View style={{ width: "50%" }}>
								<Text
									style={[
										textStyles.textMid,
										{
											color: colors.mildGray,
											fontSize: 14,
											marginBottom: 2,
										},
									]}
								>
									Head Braider:
								</Text>
								<Text style={[textStyles.textMid]}>
									{bookingData?.pro?.name}
								</Text>
							</View>
							{bookingData?.assistants?.map(
								(book: any, i: number) => (
									<View style={{ width: "50%" }} key={i + 1}>
										<Text
											style={[
												textStyles.textMid,
												{
													color: colors.mildGray,
													fontSize: 14,
													marginBottom: 2,
												},
											]}
										>
											Assistant:
										</Text>
										<Text style={[textStyles.textMid]}>
											{book?.assistant?.name}
										</Text>
									</View>
								)
							)}
						</View>
						<View style={styles.line}>
							<Text
								style={[
									textStyles.textMid,
									{
										color: colors.mildGray,
										fontSize: 14,
										marginBottom: 2,
									},
								]}
							>
								Service:
							</Text>
							{sub?.map((s: any, i: number) => (
								<Text
									style={[
										textStyles.textMid,
										{ marginTop: 4 },
									]}
									key={i + 1}
								>
									{s?.subService?.name}
								</Text>
							))}
						</View>
						<View style={[styles.line]}>
							<Text
								style={[
									textStyles.textMid,
									{
										color: colors.mildGray,
										fontSize: 14,
										marginBottom: 2,
									},
								]}
							>
								Duration:
							</Text>
							<Text style={[textStyles.textMid]}>--</Text>
						</View>
						<View style={[styles.line, { flexDirection: "row" }]}>
							<View style={{ width: "50%" }}>
								<Text
									style={[
										textStyles.textMid,
										{
											color: colors.mildGray,
											fontSize: 14,
											marginBottom: 2,
										},
									]}
								>
									Price:
								</Text>
								<Text style={[textStyles.textMid]}>
									₦{formatCurrency(price)}
								</Text>
							</View>
							<View style={{ width: "50%" }}>
								<Text
									style={[
										textStyles.textMid,
										{
											color: colors.mildGray,
											fontSize: 14,
											marginBottom: 2,
										},
									]}
								>
									Transportation:
								</Text>
								<Text style={[textStyles.textMid]}>
									₦{formatCurrency(transportation)}
								</Text>
							</View>
						</View>
						{bookingData.pinDate && (
							<View style={[styles.line]}>
								<Text
									style={[
										textStyles.textMid,
										{
											color: colors.mildGray,
											fontSize: 14,
											marginBottom: 2,
										},
									]}
								>
									Appointment Date:
								</Text>
								<Text style={[textStyles.textMid]}>
									{format(
										bookingData.pinDate,
										"do MMMM, yyyy"
									)}
								</Text>
							</View>
						)}
					</ScrollView>
				</View>
			) : (
				<View style={{ flex: 1, paddingHorizontal: 20 }}>
					<SkeletonLoad count={6} />
				</View>
			)}
		</Container>
	);
};

export default ActivityBookings;

const styles = StyleSheet.create({
	topContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	btn: {
		backgroundColor: colors.secondary,
		paddingVertical: 15,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		width: "48%",
		justifyContent: "center",
	},
	line: {
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0,0,0,0.2)",
		paddingVertical: 6,
	},
});
