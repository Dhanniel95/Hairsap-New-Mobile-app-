import colors from "@/utils/colors";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = () => {
	return (
		<View style={styles.header}>
			{/* <Logo /> */}
			<View />
			<TouchableOpacity style={{ position: "relative" }}>
				<FontAwesome name="bell" size={24} color={"#000"} />
				<View style={styles.badge}>
					<Text style={{ color: colors.white, fontSize: 9 }}>0</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: colors.midGray,
		height: 60,
	},
	badge: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		height: 14,
		width: 14,
		borderRadius: 7,
		right: -4,
		top: -4,
		backgroundColor: colors.danger,
	},
});
