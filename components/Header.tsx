import colors from "@/utils/colors";
import { useAppSelector } from "@/utils/hooks";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../assets/images/logo-dark.svg";

const Header = () => {
	const router = useRouter();

	const { notiList } = useAppSelector((state) => state.basic);

	return (
		<View style={styles.header}>
			<View style={{ alignItems: "center" }}>
				<Logo height={50} width={130} />
			</View>
			<TouchableOpacity
				style={{ position: "relative" }}
				onPress={() => router.push("/(app)/notification")}
			>
				<FontAwesome name="bell" size={24} color={"#000"} />
				<View style={styles.badge}>
					<Text style={{ color: colors.white, fontSize: 9 }}>
						{notiList?.length || 0}
					</Text>
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
