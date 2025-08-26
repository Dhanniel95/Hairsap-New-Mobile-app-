import TabProfile from "@/components/Pro/TabProfile";
import basicService from "@/redux/basic/basicService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { useAppSelector } from "@/utils/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
	const router = useRouter();

	const { user } = useAppSelector((state) => state.auth);

	const [period, setPeriod] = useState("this_month");
	const [stats, setStats] = useState({});
	const [load, setLoad] = useState(false);

	useEffect(() => {
		loadStats();
	}, []);

	const loadStats = async () => {
		try {
			setLoad(true);
			let res = await basicService.getProStats(user.userId.toString());
			setStats(res?.data);
			setLoad(false);
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#FFF" }}>
			<Text
				style={[
					textStyles.textBold,
					{ textAlign: "center", paddingVertical: 10, fontSize: 17 },
				]}
			>
				Profile
			</Text>
			<View style={{ alignItems: "center", marginTop: 20 }}>
				<View
					style={{
						position: "relative",
					}}
				>
					<Image
						source={
							user.faceIdPhotoUrl
								? { uri: user.faceIdPhotoUrl }
								: require("../../assets/images/profile.jpg")
						}
						style={styles.img}
					/>
					<TouchableOpacity
						style={styles.iconContainer}
						onPress={() => router.push("/(auth)/faceverify")}
					>
						<Ionicons
							name="camera"
							size={20}
							color={colors.white}
						/>
					</TouchableOpacity>
				</View>
				<Text
					style={[
						textStyles.textBold,
						{ fontSize: 20, marginTop: 20 },
					]}
				>
					{user.name}
				</Text>
			</View>
			<TabProfile period={period} setPeriod={setPeriod} />
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	img: {
		height: 150,
		width: 150,
		borderRadius: 75,
		borderWidth: 2,
		borderColor: colors.lightGreen,
	},
	iconContainer: {
		position: "absolute",
		width: 50,
		height: 50,
		backgroundColor: colors.primary,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
		bottom: 0,
		right: 0,
	},
});
