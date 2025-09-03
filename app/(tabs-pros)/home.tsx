import Header from "@/components/Header";
import { listNotifications } from "@/redux/basic/basicSlice";
import bookService from "@/redux/book/bookService";
import colors from "@/utils/colors";
import { useAppDispatch } from "@/utils/hooks";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

const HomeScreen = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const [appointments, setAppointments] = useState<any>([]);
	const [markedDates, setMarkedDates] = useState({});

	useEffect(() => {
		dispatch(listNotifications());
		updateLocation();
		listBookings();
	}, []);

	useEffect(() => {
		loadMarkedDates();
	}, [appointments]);

	const loadMarkedDates = () => {
		const groupedByDateWithColor = appointments.reduce(
			(acc: Record<string, { total: number }>, item: any) => {
				const date = new Date(item.pinDate).toISOString().split("T")[0];
				if (!acc[date]) {
					acc[date] = { total: 0 };
				}
				acc[date].total += item?.invoice?.invoiceFees[0]?.price / 100;
				return acc;
			},
			{}
		);

		const result = Object.entries(groupedByDateWithColor).reduce(
			(
				acc: Record<
					string,
					{ selected: boolean; selectedColor: string; total: number }
				>,
				[date, value]
			) => {
				const total = (value as { total: number }).total;
				acc[date] = {
					selected: total > 0 ? true : false,
					selectedColor: total >= 50000 ? "green" : "red",
					total: total,
				};
				return acc;
			},
			{}
		);

		setMarkedDates(result);
	};

	const updateLocation = async () => {};

	const listBookings = async () => {
		try {
			let res = await bookService.listBookings();
			if (Array.isArray(res?.data)) {
				let appoints = res.data.filter((item: any) => {
					return item.pinStatus != null;
				});
				setAppointments(appoints);
			}
		} catch (err) {}
	};

	const scrollToDate = (selectedDate: any) => {
		console.log(selectedDate, "dateSelected");
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#FFF" }}>
			<Header />
			<View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
				<Calendar
					onDayPress={(day) => {
						scrollToDate(day.dateString);
					}}
					markedDates={markedDates}
				/>
			</View>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: colors.appGray,
		paddingBottom: 30,
		borderRadius: 6,
		marginBottom: 20,
		alignItems: "flex-start",
	},

	innerTextContainer: {
		padding: 4,
		alignSelf: "flex-start",
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 20,
		backgroundColor: "#fff",
	},
	text: {
		color: colors.black,
		marginTop: 20,
		fontFamily: "regular",
	},
	text2: {
		color: colors.mildGray,
		fontFamily: "regular",
	},
	bottomContainer: {
		marginTop: 5,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	iconContainer: {
		height: 30,
		width: 30,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.white,
		borderRadius: 20,
	},
});
