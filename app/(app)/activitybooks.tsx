import RequestList from "@/components/Booking/RequestList";
import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import bookService from "@/redux/book/bookService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { formatCurrency } from "@/utils/currency";
import { displayError } from "@/utils/error";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
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
							return accumulator + object.price;
						},
						0
					)
				);
			}
		} catch (err) {
			setLoad(false);
			console.log(displayError(err, false));
		}
	};

	return (
		<Container dark={true} bg="#FFF">
			<GoBack
				bgColor={colors.dark}
				iconColor={colors.white}
				title={"Activity"}
			/>
			<View
				style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 25 }}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.topContainer}>
						<Image
							style={{ height: 70, width: 70, borderRadius: 35 }}
							source={
								bookingData?.user?.faceIdPhotoUrl == null
									? require("../../assets/images/profile.jpg")
									: { uri: bookingData?.user?.faceIdPhotoUrl }
							}
						/>
					</View>
					<Text style={[textStyles.textBold]}>
						Booking from {bookingData?.user?.name}
					</Text>
					<Text
						style={[
							textStyles.textMid,
							{
								color: colors.mildGray,
							},
						]}
					>
						{bookingData?.address}
					</Text>
					<Text
						style={{
							marginTop: 20,
							marginBottom: 20,
							fontFamily: "regular",
						}}
					>
						<MaterialCommunityIcons
							name="map-marker"
							color={colors.primary}
							size={20}
						/>{" "}
						{(bookingData?.invoice?.distance || 0 / 1000).toFixed(
							1
						)}{" "}
						km away
					</Text>
					<View style={[{ marginBottom: 20 }]}>
						<TouchableOpacity
							style={{
								width: "30%",
								backgroundColor: colors.secondary,
								paddingVertical: 15,
								alignItems: "center",
								borderRadius: 15,
							}}
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
						</TouchableOpacity>
					</View>
					<RequestList
						title={service?.name}
						value={
							"₦" +
							formatCurrency(
								bookingData?.invoice?.invoiceFees[0]?.price /
									100
							)
						}
					/>
					{sub.length > 0 && (
						<Text style={{ fontFamily: "bold" }}>
							All Sub Services
						</Text>
					)}
					{sub.length > 0 &&
						sub.map((item: any, index: number) => {
							return (
								<View
									key={index}
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Text
										style={{
											fontSize: 13,
											width: "80%",
											fontFamily: "regular",
										}}
									>
										{item?.subService?.name}
									</Text>
									<TouchableOpacity>
										<Text
											style={[
												{
													fontFamily: "regular",
													color: colors.danger,
												},
											]}
										>
											Remove
										</Text>
									</TouchableOpacity>
								</View>
							);
						})}
					{sub.length > 0 && <View style={{ height: 15 }} />}
					<RequestList
						title="Transportation"
						value={"₦" + formatCurrency(transportation)}
					/>

					<RequestList
						title="Discount"
						value={
							"₦" +
							(bookingData?.invoice?.promo == null
								? 0
								: formatCurrency(
										bookingData?.promoAmount || 0 / 100
								  ))
						}
					/>
					<RequestList
						title="Total (Extra services included)"
						value={
							"₦" +
							(bookingData?.invoice?.promo == null
								? formatCurrency(price / 100 + transportation)
								: formatCurrency(
										transportation +
											(price - bookingData?.promoAmount ||
												0) /
												100
								  ))
						}
					/>
					{pinState == "paid" && (
						<View style={{ marginTop: 10 }}>
							<RequestList
								width={40}
								title={"Appointment Date"}
								value={format(
									parseISO(
										bookingData?.pinDate || new Date()
									),
									"do MMMM, yyyy  h:mm a"
								)}
							/>
						</View>
					)}
				</ScrollView>
			</View>
		</Container>
	);
};

export default ActivityBookings;

const styles = StyleSheet.create({
	topContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
});
