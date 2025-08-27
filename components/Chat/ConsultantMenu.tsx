import textStyles from "@/styles/textStyles";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BookingForm from "../Booking/BookingForm";
import ModalComponent from "../ModalComponent";
import UserForm from "../User/UserForm";

const ConsultantMenu = ({
	allowBooking,
	allowUserCreate,
}: {
	allowBooking?: boolean;
	allowUserCreate?: boolean;
}) => {
	const [openModal, setOpenModal] = useState(false);
	const [forBooking, setForBooking] = useState(false);

	return (
		<View style={styles.box}>
			<TouchableOpacity
				activeOpacity={0.8}
				style={{
					alignItems: "center",
					marginHorizontal: 15,
					opacity: allowBooking ? 1 : 0.3,
				}}
				disabled={!allowBooking}
				onPress={() => {
					setForBooking(true);
					setOpenModal(true);
				}}
			>
				<View style={styles.innerBox}>
					<Feather name="edit" size={25} color={"#FFF"} />
				</View>
				<Text
					style={[
						textStyles.textMid,
						{ fontSize: 12, color: "#FFF", marginTop: 6 },
					]}
				>
					Create Booking
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.8}
				style={{
					alignItems: "center",
					marginHorizontal: 15,
					opacity: allowUserCreate ? 1 : 0.3,
				}}
				disabled={!allowUserCreate}
				onPress={() => {
					setForBooking(false);
					setOpenModal(true);
				}}
			>
				<View style={styles.innerBox}>
					<AntDesign name="adduser" size={25} color={"#FFF"} />
				</View>
				<Text
					style={[
						textStyles.textMid,
						{ fontSize: 12, color: "#FFF", marginTop: 6 },
					]}
				>
					Create User
				</Text>
			</TouchableOpacity>
			<ModalComponent
				open={openModal}
				closeModal={() => setOpenModal(false)}
				centered
				bg="#334155"
			>
				{forBooking ? <BookingForm /> : <UserForm />}
			</ModalComponent>
		</View>
	);
};

export default ConsultantMenu;

const styles = StyleSheet.create({
	box: {
		backgroundColor: "#334155",
		borderRadius: 4,
		paddingVertical: 10,
		flexDirection: "row",
		justifyContent: "center",
	},
	innerBox: {
		backgroundColor: "#E5E5E533",
		height: 50,
		width: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
	},
});
