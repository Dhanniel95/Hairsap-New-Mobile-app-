import { formatCurrency } from "@/utils/currency";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { format, parse } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import {
	FlatList,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import ModalComponent from "../ModalComponent";
import BookingCard from "./BookingCard";

const AcceptedList = ({ items }: { items: any }) => {
	const { height } = useWindowDimensions();

	const flatListRef = useRef<any>(null);
	const [showCalendar, setShowCalendar] = useState(false);
	const [markedDates, setMarkedDates] = useState({});

	const initialOffset = 50;
	const today = new Date();

	useEffect(() => {
		loadMarkedDates();
	}, []);

	const loadMarkedDates = () => {
		const groupedByDateWithColor = items.reduce(
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

	const getDateString = (base: any, offset: any) => {
		const date = new Date(base);
		date.setDate(base.getDate() + offset);
		return date.toLocaleDateString("en-GB");
	};

	const formatDateString = (dt: any) => {
		const parsedDate = parse(dt, "dd/MM/yyyy", new Date());
		const formattedDate = format(parsedDate, "do MMMM, yyyy");
		return formattedDate;
	};

	const [dates, setDates] = useState(() => {
		return Array.from({ length: 101 }, (_, i) =>
			getDateString(today, i - initialOffset)
		);
	});

	const totalBookings = (arr: any) => {
		let totalArr = arr.reduce(
			(a: any, b: any) => a + b?.invoice?.invoiceFees[0]?.price,
			0
		);
		return totalArr / 100;
	};

	const getItemsInDate = (date: any) => {
		let list = Array.isArray(items)
			? items.filter(
					(li) =>
						new Date(li.pinDate).toLocaleDateString("en-GB") ===
						date
			  )
			: null;
		return list || [];
	};

	const getDayDifference = (date1: any, date2: any) => {
		const oneDay = 24 * 60 * 60 * 1000;
		const diff = Math.floor(
			(date1.setHours(0, 0, 0, 0) - date2.setHours(0, 0, 0, 0)) / oneDay
		);
		return diff;
	};

	const scrollToDate = (selectedDate: any) => {
		const diff = getDayDifference(new Date(selectedDate), today);
		const index = initialOffset + diff;

		// Optionally expand the list if it's out of range
		if (index < 0) {
			const newDates = Array.from({ length: Math.abs(index) }, (_, i) =>
				getDateString(today, -Math.abs(index) + i)
			);
			setDates((prev) => [...newDates, ...prev]);
			setTimeout(() => {
				flatListRef.current?.scrollToIndex({
					index: 0,
					animated: true,
				});
			}, 100);
		} else if (index >= dates.length) {
			const newDates = Array.from(
				{ length: index - dates.length + 1 },
				(_, i) => getDateString(today, dates.length - initialOffset + i)
			);
			setDates((prev) => [...prev, ...newDates]);
			setTimeout(() => {
				flatListRef.current?.scrollToIndex({ index, animated: true });
			}, 100);
		} else {
			flatListRef.current?.scrollToIndex({ index, animated: true });
		}
		setShowCalendar(false);
	};

	console.log(showCalendar);

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={dates}
				keyExtractor={(item) => item}
				ref={flatListRef}
				renderItem={({ item }) => (
					<View style={{ height }}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingHorizontal: "10%",
								marginTop: 25,
							}}
						>
							<Text
								style={{
									textAlign: "center",
									fontFamily: "poppins",
									fontSize: 18,
									fontWeight: 600,
								}}
							>
								{formatDateString(item)}
							</Text>
							<TouchableOpacity
								activeOpacity={0.6}
								onPress={() => setShowCalendar(true)}
								style={{
									height: 40,
									width: 40,
									backgroundColor: "#279E98",
									borderRadius: 20,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<AntDesign
									name="calendar"
									size={20}
									color={"#fff"}
								/>
							</TouchableOpacity>
						</View>
						<View
							style={{
								alignItems: "center",
								marginVertical: 15,
							}}
						>
							<View
								style={{
									borderColor: "#279E98",
									borderWidth: 2,
									paddingHorizontal: 50,
									paddingVertical: 15,
									borderRadius: 10,
									alignItems: "center",
								}}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										marginBottom: 15,
									}}
								>
									<Text
										style={{
											fontSize: 11,
											textTransform: "uppercase",
											marginRight: 10,
											fontFamily: "poppins",
										}}
									>
										Total Appointment Bookings
									</Text>
									<Ionicons
										name="cash-outline"
										size={15}
										color={"blue"}
									/>
								</View>

								<Text
									style={{
										fontSize: 25,
										fontWeight: 700,
										fontFamily: "poppins",
									}}
								>
									₦{" "}
									{formatCurrency(
										totalBookings(getItemsInDate(item))
									)}
								</Text>
							</View>
						</View>
						<BookingCard books={getItemsInDate(item)} />
					</View>
				)}
				pagingEnabled
				showsVerticalScrollIndicator={false}
				bounces={false}
				snapToInterval={height}
				decelerationRate={"fast"}
				snapToAlignment="start"
				initialScrollIndex={initialOffset}
				getItemLayout={(_, index) => ({
					length: height,
					offset: height * index,
					index,
				})}
			/>
			<Text
				style={{
					textAlign: "center",
					fontSize: 11,
					marginBottom: 10,
					fontStyle: "italic",
					fontFamily: "poppins",
				}}
			>
				Scroll Up to view the next day
			</Text>
			<ModalComponent
				open={showCalendar}
				closeModal={() => setShowCalendar(false)}
			>
				<Calendar
					onDayPress={(day) => {
						scrollToDate(day.dateString);
					}}
					markedDates={markedDates}
				/>
			</ModalComponent>
		</View>
	);
};

export default AcceptedList;
