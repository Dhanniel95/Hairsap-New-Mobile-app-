import { format, parseISO } from "date-fns";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import RequestCard from "./RequestCard";

const PendingList = ({ items }: { items: any }) => {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ flex: 1 }}>
					{items.length > 0 ? (
						items.map((item: any, index: number) => {
							return (
								<View key={index}>
									<Text
										style={{
											marginVertical: 10,
											fontFamily: "regular",
										}}
									>
										{item.pinDate == null
											? format(
													parseISO(item.createdAt),
													"do MMMM, yyyy   h:mm a"
											  )
											: format(
													parseISO(item.pinDate),
													"do MMMM, yyyy   h:mm a"
											  )}
									</Text>
									<RequestCard book={item} />
								</View>
							);
						})
					) : (
						<>
							<Text
								style={{
									textAlign: "center",
									marginTop: "50%",
									fontFamily: "regular",
								}}
							>
								You have no missed bookings
							</Text>
						</>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

export default PendingList;
