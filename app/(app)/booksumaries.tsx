import Tab from "@/components/Basics/Tab";
import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import bookService from "@/redux/book/bookService";
import colors from "@/utils/colors";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const BookingSummaries = () => {
	const params = useLocalSearchParams();

	const [pendings, setPendings] = useState([]);
	const [accepted, setAccepted] = useState([]);
	const [activeTab, setActiveTab] = useState(1);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		listBookings();
	}, []);

	const listBookings = async () => {
		try {
			setLoad(true);
			let res = await bookService.listBookingSummaries(
				params?.userId || ""
			);
			console.log(res, "res");
			if (Array.isArray(res?.data)) {
				let appoints = res.data.filter((item: any) => {
					return item.pinStatus != null;
				});
				let pendings = res.data.filter((item: any) => {
					return item.pinStatus == null;
				});
				setPendings(pendings);
				setAccepted(appoints);
			}
		} catch (err: any) {
			console.log(err?.response?.data, "err");
			setLoad(false);
		}
	};

	return (
		<Container dark={true} bg="#FFF">
			<GoBack
				bgColor={colors.dark}
				iconColor={colors.white}
				title="Booking Summaries"
			/>
			<View
				style={{
					flex: 1,
					paddingHorizontal: "8%",
					paddingVertical: 40,
				}}
			>
				<View style={{ marginBottom: 20 }}>
					<Tab
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						tabs={[
							{
								id: 1,
								name: "Pending",
								sub: pendings.length,
							},
							{
								id: 2,
								name: "Completed",
								sub: accepted.length,
							},
						]}
					/>
				</View>
			</View>
		</Container>
	);
};

export default BookingSummaries;

const styles = StyleSheet.create({});
