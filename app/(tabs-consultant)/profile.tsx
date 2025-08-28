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
			<View style={{ flex: 1, paddingHorizontal: 25 }}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 30 }}
				>
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
						<Text
							style={[
								textStyles.textBold,
								{ color: colors.mediumGray, fontSize: 14 },
							]}
						>
							June Target
						</Text>
						<View style={{ alignItems: "center" }}>
							<View style={styles.round}>
								<Text
									style={[
										textStyles.textBold,
										{ fontSize: 18 },
									]}
								>
									78%
								</Text>
								<Text
									style={[textStyles.text, { fontSize: 13 }]}
								>
									of target
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								marginTop: 20,
							}}
						>
							<View style={{ alignItems: "center" }}>
								<Text
									style={[
										textStyles.textMid,
										{
											fontSize: 16,
											color: colors.mediumGray,
										},
									]}
								>
									Current
								</Text>
								<Text
									style={[
										textStyles.textBold,
										{
											fontSize: 16,
										},
									]}
								>
									₦100,000
								</Text>
							</View>
							<View style={{ alignItems: "center" }}>
								<Text
									style={[
										textStyles.textMid,
										{
											fontSize: 16,
											color: colors.mediumGray,
										},
									]}
								>
									Target
								</Text>
								<Text
									style={[
										textStyles.textBold,
										{
											fontSize: 16,
										},
									]}
								>
									₦100,000
								</Text>
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
	round: {
		height: 180,
		width: 180,
		borderRadius: 90,
		borderWidth: 5,
		borderColor: colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},
});
