import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import SkeletonLoad from "@/components/SkeletonLoad";
import bookService from "@/redux/book/bookService";
import chatService from "@/redux/chat/chatService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { formatCurrency } from "@/utils/currency";
import { useAppSelector } from "@/utils/hooks";
import {
	Feather,
	FontAwesome,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const ActivityBookings = () => {
	const { user } = useAppSelector((state) => state.auth);

	const router = useRouter();

	const params = useLocalSearchParams();

	const [bookingData, setBookingData] = useState<any>({});
	const [transportation, setTransportation] = useState(0);
	const [sub, setSub] = useState<any>([]);
	const [price, setPrice] = useState(0);
	const [loadChat, setLoadChat] = useState(false);

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
			let res = await bookService.loadBookingData(params?.itemId || "");
			if (res?.user) {
				setBookingData(res);
				setSub(res?.bookedSubServices);
				setPrice(
					res?.invoice?.invoiceFees?.reduce(
						(accumulator: any, object: any) => {
							return accumulator + object.price / 100;
						},
						0
					)
				);
			}
		} catch (err) {}
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

	const chatConsultant = async () => {
		try {
			setLoadChat(true);
			let res = await chatService.listChatRooms();
			setLoadChat(false);
			if (
				Array.isArray(res?.data?.chatRooms) &&
				res.data.chatRooms?.length > 0
			) {
				let find = res.data.chatRooms.find((f: any) =>
					f.participants.some(
						(p: any) => p.userId == bookingData?.consultant?.userId
					)
				);
				if (find) {
					router.push({
						pathname: "/(app)/chat",
						params: {
							chatRoomId: find.chat?.chatRoomId,
							user: find.name,
							image: find.profilePhotoUrl,
							newMsg: "1",
							receiverId: user.userId,
							isParticipant: `true`,
						},
					});
				} else {
					router.push({
						pathname: "/(app)/chat",
						params: {
							chatRoomId: null,
							user: bookingData.consultant?.name,
							image: bookingData?.consultant?.profilePhotoUrl,
							newMsg: "1",
							receiverId: user.userId,
							isParticipant: `true`,
						},
					});
				}
			} else {
				router.push({
					pathname: "/(app)/chat",
					params: {
						chatRoomId: null,
						user: bookingData.consultant?.name,
						image: bookingData?.consultant?.profilePhotoUrl,
						newMsg: "1",
						receiverId: user.userId,
						isParticipant: `true`,
					},
				});
			}
		} catch (err) {
			setLoadChat(false);
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
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 50 }}
					>
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
									{bookingData?.user?.name}
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
								onPress={chatConsultant}
								disabled={loadChat}
							>
								{loadChat ? (
									<ActivityIndicator color={"#FFF"} />
								) : (
									<Feather
										color={"#FFF"}
										size={22}
										name={"message-square"}
									/>
								)}
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
								Price:
							</Text>
							<Text style={[textStyles.textMid]}>
								₦{formatCurrency(price)}
							</Text>
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
						{bookingData.description && (
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
									Description:
								</Text>
								<Text style={[textStyles.textMid]}>
									{bookingData.description?.text || "--"}
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
