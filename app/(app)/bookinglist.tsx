import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import EachAccepted from "@/components/List/EachAccepted";
import SkeletonLoad from "@/components/SkeletonLoad";
import bookService from "@/redux/book/bookService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { format } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

const BookingListScreen = () => {
	const params = useLocalSearchParams();

	const [load, setLoad] = useState(false);
	const [list, setList] = useState<any>([]);

	useEffect(() => {
		listBookings();
	}, []);

	const listBookings = async () => {
		try {
			setLoad(true);
			let res = await bookService.listBookings();
			if (Array.isArray(res?.data)) {
				let filter = res.data.filter(
					(book: any) =>
						new Date(book.pinDate).toISOString().split("T")[0] ===
						params?.date
				);
				setList(filter);
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
				title={"Accepted Bookings"}
			/>
			<View
				style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 25 }}
			>
				{params?.date ? (
					<Text
						style={[
							textStyles.textMid,
							{ textAlign: "center", marginBottom: 25 },
						]}
					>
						{format(params?.date, "do MMMM, yyyy")}
					</Text>
				) : (
					<></>
				)}
				{load ? (
					<SkeletonLoad count={5} />
				) : (
					<View style={{ flex: 1 }}>
						<FlatList
							data={list}
							keyExtractor={(item: any) =>
								item.bookingId.toString()
							}
							renderItem={({ item }) => (
								<EachAccepted booking={item} />
							)}
							contentContainerStyle={{ paddingBottom: 100 }}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				)}
			</View>
		</Container>
	);
};

export default BookingListScreen;
