import { formatCurrency } from "@/utils/currency";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const BookingCard = ({ books }: { books: any }) => {
	const router = useRouter();

	return (
		<View style={{ paddingHorizontal: 20, marginTop: 20 }}>
			{books.length > 0 ? (
				<ScrollView
					horizontal={books.length > 1 ? true : false}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					<View style={{ flexDirection: "row" }}>
						{books.map((book: any) => (
							<TouchableOpacity
								key={book.bookingId}
								style={{
									backgroundColor: "#29CCC4",
									width: books.length > 1 ? 300 : "100%",
									paddingHorizontal: 20,
									paddingVertical: 15,
									borderRadius: 5,
									borderColor: "orange",
									borderRightWidth: 3,
									marginRight: books.length > 1 ? 15 : 0,
								}}
								onPress={() =>
									router.push({
										pathname: "/(app)/activitybooks",
										params: { items: book },
									})
								}
								activeOpacity={0.6}
							>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										marginBottom: 15,
									}}
								>
									<Image
										source={
											book?.user.faceIdPhotoUrl
												? {
														uri: book.user
															.faceIdPhotoUrl,
												  }
												: require("../../assets/images/profile.jpg")
										}
										style={{
											height: 40,
											width: 40,
											borderRadius: 20,
										}}
									/>
									<Text
										style={{
											fontSize: 18,
											marginLeft: 10,
											fontFamily: "poppins",
										}}
									>
										{book?.user?.name}
									</Text>
								</View>
								<View>
									<Text
										style={{
											fontSize: 16,
											fontFamily: "poppins",
										}}
									>
										{book?.invoice?.invoiceFees[0].name}
									</Text>
									<Text
										style={{
											fontSize: 20,
											marginTop: 4,
											fontFamily: "poppins",
										}}
									>
										₦
										{formatCurrency(
											book?.invoice?.invoiceFees[0]
												.price / 100
										)}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
				</ScrollView>
			) : (
				<View style={{ marginTop: 50, alignItems: "center" }}>
					<Text style={{ fontSize: 15, fontFamily: "poppins" }}>
						You have no bookings for the selected date
					</Text>
				</View>
			)}
		</View>
	);
};

export default BookingCard;
