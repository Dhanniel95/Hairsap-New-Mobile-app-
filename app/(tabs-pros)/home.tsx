import Header from "@/components/Header";
import bookService from "@/redux/book/bookService";
import colors from "@/utils/colors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
	const [load, setLoad] = useState(false);
	const [accepted, setAccepted] = useState<any>([]);
	const [appointments, setAppointments] = useState<any>([]);

	useEffect(() => {
		updateLocation();
		listBookings();
	}, []);

	const updateLocation = async () => {};

	const listBookings = async () => {
		try {
			setLoad(true);
			let res = await bookService.listBookings();
			if (Array.isArray(res?.data)) {
				let appoints = res.data.filter((item: any) => {
					return item.pinStatus != null;
				});
				let pendings = res.data.filter((item: any) => {
					return item.pinStatus == null;
				});
				setAppointments(appoints);
				setAccepted(pendings);
			}
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#FFF" }}>
			<Header />
			<View style={{ paddingHorizontal: 20, paddingVertical: 25 }}>
				<TouchableOpacity onPress={() => console.log("")}>
					<View style={styles.container}>
						<View style={styles.innerTextContainer}>
							<Text
								style={{ fontFamily: "medium", fontSize: 17 }}
							>
								Appointment Bookings
							</Text>
						</View>
						<Text style={[styles.text]}>
							{appointments?.length > 0
								? appointments[0]?.pinStatus === "waiting"
									? "You have a booking awaiting admin confirmation"
									: "You have an appointment booking"
								: "You currently have no appointment bookings"}
						</Text>
						<View style={styles.bottomContainer}>
							<Text style={[styles.text2, { width: "80%" }]}>
								{appointments?.length > 0
									? appointments[0]?.address
									: ""}
							</Text>
							{appointments.length > 0 && (
								<View style={styles.iconContainer}>
									<FontAwesome name="angle-right" size={20} />
								</View>
							)}
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => console.log("")}>
					<View style={styles.container}>
						<View style={styles.innerTextContainer}>
							<Text
								style={{ fontFamily: "medium", fontSize: 17 }}
							>
								Pending Bookings
							</Text>
						</View>
						<Text style={[styles.text]}>
							{accepted?.length > 0
								? "You have a new booking"
								: "You currently have no accepted booking"}
						</Text>
						<View style={styles.bottomContainer}>
							<Text style={[styles.text2, { width: "80%" }]}>
								{accepted?.length > 0
									? accepted[0]?.address
									: ""}
							</Text>
							{accepted.length > 0 && (
								<View style={styles.iconContainer}>
									<FontAwesome name="angle-right" size={20} />
								</View>
							)}
						</View>
					</View>
				</TouchableOpacity>
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
