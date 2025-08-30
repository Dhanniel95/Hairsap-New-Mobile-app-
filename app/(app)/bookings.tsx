import AcceptedList from "@/components/Booking/AcceptedList";
import PendingList from "@/components/Booking/PendingList";
import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import SkeletonLoad from "@/components/SkeletonLoad";
import bookService from "@/redux/book/bookService";
import colors from "@/utils/colors";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

const Bookings = () => {
	const params = useLocalSearchParams();

	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>([]);

	useEffect(() => {
		loadBookings();
	}, []);

	const loadBookings = async () => {
		try {
			setLoad(true);
			let res = await bookService.listBookings();
			if (Array.isArray(res?.data)) {
				let pendings = res.data.filter((item: any) => {
					return item.pinStatus != null;
				});
				let accepted = res.data.filter((item: any) => {
					return item.pinStatus == null;
				});
				setList(params?.type === "accepted" ? accepted : pendings);
			}
			setLoad(false);
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<Container dark={true} bg="#FFF">
			<GoBack
				bgColor={colors.dark}
				iconColor={colors.white}
				title={
					params?.type === "accepted"
						? "Accepted Bookings"
						: "Pending Bookings"
				}
			/>
			<View
				style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 25 }}
			>
				{load ? (
					<SkeletonLoad count={5} />
				) : params?.type === "accepted" ? (
					<AcceptedList items={list} />
				) : (
					<PendingList items={list} />
				)}
			</View>
		</Container>
	);
};

export default Bookings;
