import consultantService from "@/redux/consultant/consultantService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { useAppSelector } from "@/utils/hooks";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const ProfileScreen = () => {
	const router = useRouter();

	const { user } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [profile, setProfile] = useState<any>({});

	useEffect(() => {
		getProfile();
	}, []);

	const getProfile = async () => {
		try {
			setLoad(true);
			let res = await consultantService.profileDetails(user.userId);
			console.log(res, "res");
			setLoad(false);
		} catch (err) {
			setLoad(false);
			console.log(err, "err");
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
			<View style={{ flex: 1, paddingHorizontal: 20 }}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ flex: 1 }}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
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
							<View style={{ marginLeft: 15 }}>
								<Text style={[textStyles.textBold]}>
									{user.name}
								</Text>
								<Text style={[textStyles.text]}>
									{user.email}
								</Text>
							</View>
						</View>
						<View style={{ marginTop: 30 }}>
							<Text
								style={[
									textStyles.textBold,
									{ color: colors.mediumGray, fontSize: 14 },
								]}
							>
								Key Performance Summary
							</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									marginVertical: 20,
								}}
							>
								<View
									style={{
										width: "32%",
										alignItems: "center",
									}}
								>
									<Entypo
										name="bar-graph"
										color={colors.primary}
										size={25}
									/>
									<Text
										style={[
											textStyles.textBold,
											{ marginTop: 10, fontSize: 16 },
										]}
									>
										₦100,000
									</Text>
									<Text
										style={[
											textStyles.textMid,
											{
												color: colors.mediumGray,
												fontSize: 14,
											},
										]}
									>
										Monthly Sales
									</Text>
								</View>
								<View
									style={{
										width: "32%",
										alignItems: "center",
									}}
								>
									<AntDesign
										name="calendar"
										size={25}
										color={colors.primary}
									/>
									<Text
										style={[
											textStyles.textBold,
											{ marginTop: 10, fontSize: 16 },
										]}
									>
										32
									</Text>
									<Text
										style={[
											textStyles.textMid,
											{
												color: colors.mediumGray,
												fontSize: 14,
											},
										]}
									>
										Bookings
									</Text>
								</View>
								<View
									style={{
										width: "32%",
										alignItems: "center",
									}}
								>
									<Entypo
										name="bar-graph"
										color={"lightgreen"}
										size={25}
									/>
									<Text
										style={[
											textStyles.textBold,
											{ marginTop: 10, fontSize: 16 },
										]}
									>
										78%
									</Text>
									<Text
										style={[
											textStyles.textMid,
											{
												color: colors.mediumGray,
												fontSize: 14,
											},
										]}
									>
										Achievement
									</Text>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	img: {
		height: 80,
		width: 80,
		borderRadius: 40,
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
