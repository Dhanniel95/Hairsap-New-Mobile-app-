import EachReview from "@/components/List/EachReview";
import BookingRatioBox from "@/components/Pro/BookingRatioBox";
import StatsBox from "@/components/Pro/StatsBox";
import TabProfile from "@/components/Pro/TabProfile";
import TaskTarget from "@/components/Pro/TaskTarget";
import TransportBox from "@/components/Pro/TransportBox";
import basicService from "@/redux/basic/basicService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { displayError } from "@/utils/error";
import { useAppSelector } from "@/utils/hooks";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const ProfileScreen = () => {
	const { user } = useAppSelector((state) => state.auth);

	const [period, setPeriod] = useState("this_month");
	const [stats, setStats] = useState<any>({});
	const [load, setLoad] = useState(false);
	const [reviews, setReviews] = useState<any>([]);

	useEffect(() => {
		loadStats();
		loadReviews();
	}, []);

	const loadStats = async () => {
		try {
			setLoad(true);
			let res = await basicService.getProStats(user.userId.toString());
			setStats(res);
			setLoad(false);
		} catch (err) {
			console.log(displayError(err, false), "err");
			setLoad(false);
		}
	};

	const loadReviews = async () => {
		try {
			let res = await basicService.getReviews(user.userId);
			if (Array.isArray(res)) {
				setReviews(res);
			}
		} catch (err) {}
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#FFF" }}>
			<Text
				style={[
					textStyles.textBold,
					{ textAlign: "center", paddingVertical: 10, fontSize: 17 },
				]}
			>
				Profile
			</Text>
			<View
				style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 100 }}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ flex: 1 }}>
						<View style={{ alignItems: "center", marginTop: 20 }}>
							<View
								style={{
									position: "relative",
								}}
							>
								<Image
									source={
										user.faceIdPhotoUrl
											? { uri: user.faceIdPhotoUrl }
											: require("../../assets/images/profile.jpg")
									}
									style={styles.img}
								/>
							</View>
							<Text
								style={[
									textStyles.textBold,
									{ fontSize: 20, marginTop: 20 },
								]}
							>
								{user.name}
							</Text>
						</View>
						<TabProfile period={period} setPeriod={setPeriod} />
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								marginVertical: 20,
							}}
						>
							<View style={styles.statBox}>
								<Text
									style={[
										textStyles.textBold,
										{ fontSize: 18 },
									]}
								>
									{period == "this_month"
										? stats?.bookingsCount
										: stats?.lastMonthStats?.bookingsCount}
								</Text>
								<Text
									style={[
										textStyles.textMid,
										{ fontSize: 11 },
									]}
								>
									All Bookings
								</Text>
							</View>
							<View style={styles.statBox}>
								<Text
									style={[
										textStyles.textBold,
										{ fontSize: 18 },
									]}
								>
									{period == "this_month"
										? stats?.completedBookingCount
										: stats?.lastMonthStats
												?.completedBookingCount}
								</Text>
								<Text
									style={[
										textStyles.textMid,
										{ fontSize: 11 },
									]}
								>
									Completed Bookings
								</Text>
							</View>
						</View>
						<TaskTarget />
						<StatsBox
							monthlyBooking={
								period == "this_month"
									? stats?.bookingAmount
									: stats?.lastMonthStats
											?.previousBookingAmount
							}
							completedBooking={
								period == "this_month"
									? stats?.completedBookingAmount
									: stats?.lastMonthStats
											?.CompletedBookingAmount
							}
						/>
						<BookingRatioBox
							totalBooking={
								period == "this_month"
									? stats?.completedBookingCount
									: stats?.lastMonthStats
											?.completedBookingCount
							}
							newBooking={
								period == "this_month"
									? stats?.ratio?.newBookingCount || 0
									: stats?.lastMonthStats?.ratio
											?.newBookingCount || 0
							}
							returnedBooking={
								period == "this_month"
									? stats?.ratio?.returnedBookingCount || 0
									: stats?.lastMonthStats?.ratio
											?.returnedBookingCount || 0
							}
							progress={
								period === "this_month"
									? stats?.progress
									: stats?.previousProgress
							}
							spending={
								period === "this_month"
									? stats?.spending
									: stats?.previousSpending
							}
						/>
						<TransportBox
							transportAmount={
								period === "this_month"
									? stats?.transportAmount
									: stats?.lastMonthStats?.transportAmount
							}
						/>
						<View style={styles.row}>
							<Text style={[textStyles.textMid]}>
								Retirement Pension
							</Text>
							<Text style={[textStyles.textBold]}>
								₦{(stats?.pensionAmount / 100).toLocaleString()}
							</Text>
						</View>
						<Text style={[textStyles.textBold, { marginTop: 30 }]}>
							My Reviews
						</Text>
						{reviews.length > 0 ? (
							reviews.map((item: any, index: number) => {
								return (
									<EachReview
										key={index}
										heading={item.user.name}
										date={format(
											parseISO(item.createdAt),
											"do MMMM, yyyy"
										)}
										description={item.review}
									/>
								);
							})
						) : (
							<Text
								style={[
									textStyles.text,
									{ marginVertical: 20, textAlign: "center" },
								]}
							>
								No reviews available
							</Text>
						)}
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	img: {
		height: 150,
		width: 150,
		borderRadius: 75,
		borderWidth: 2,
		borderColor: colors.lightGreen,
	},
	iconContainer: {
		position: "absolute",
		width: 50,
		height: 50,
		backgroundColor: colors.primary,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		bottom: 0,
		right: 0,
	},
	statBox: {
		paddingVertical: 15,
		backgroundColor: colors.appGray,
		borderRadius: 6,
		width: "47%",
		alignItems: "center",
	},
	row: {
		marginTop: 20,
		backgroundColor: colors.white,
		borderRadius: 10,
		padding: 15,
		elevation: 2,
		shadowColor: "grey",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
