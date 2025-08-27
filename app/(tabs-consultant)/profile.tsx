import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { useAppSelector } from "@/utils/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
	const router = useRouter();

	const { user } = useAppSelector((state) => state.auth);

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
			<View style={{ paddingHorizontal: "10%", marginTop: 30 }}>
				<View style={styles.divider}>
					<View>
						<Text style={[textStyles.textBold]}>Email:</Text>
						<Text style={[textStyles.text]}>
							{user?.email || "Email not set"}
						</Text>
					</View>
				</View>
				<View style={styles.divider}>
					<View>
						<Text style={[textStyles.textBold]}>Phone:</Text>
						<Text style={[textStyles.text]}>
							{user?.phone || "Phone not set"}
						</Text>
					</View>
				</View>
			</View>
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
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: colors.appGray,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 15,
		marginBottom: 20,
	},
});
