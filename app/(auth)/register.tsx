import Container from "@/components/Container";
import FloatInput from "@/components/FloatInput";
import GoBack from "@/components/GoBack";
import authService from "@/redux/auth/authService";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { displayError } from "@/utils/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const Register = () => {
	const router = useRouter();

	const [load, setLoad] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
	const [fname, setFname] = useState("");
	const [phone, setPhone] = useState("");

	const submitHandler = async () => {
		if (fname && phone && confirmPassword && password) {
			if (phone.length === 11) {
				if (password && password === confirmPassword) {
					try {
						let payload = {
							name: fname.trim(),
							phone: phone.trim(),
							password: password.trim(),
							role: "user",
						};
						setLoad(true);
						let res = await authService.register(payload);
						setLoad(false);
						if (res?.data?.token) {
							await AsyncStorage.setItem(
								"@accesstoken",
								res.data.token
							);
						}
						router.push({
							pathname: "/(auth)/faceverify",
							params: res?.data?.user,
						});
					} catch (err) {
						setLoad(false);
						displayError(err, true);
					}
				} else {
					displayError("Passwords do not match", true);
				}
			} else {
				displayError("Please enter a valid phone number", true);
			}
		} else {
			displayError("Please fill all fields!", true);
		}
	};

	return (
		<Container dark={true} bg="#FFF">
			<View style={{ flex: 1, paddingVertical: 10 }}>
				<GoBack
					bgColor={colors.dark}
					iconColor={colors.white}
					title="Register"
				/>
				<KeyboardAvoidingView
					style={{
						width: "100%",
						paddingTop: Platform.OS == "android" ? 30 : 0,
					}}
				>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={{ flex: 1, paddingHorizontal: "8%" }}>
							<FloatInput
								label="Full Name"
								value={fname}
								setValue={setFname}
							/>
							<FloatInput
								label="Mobile Number"
								value={phone}
								setValue={setPhone}
								number={true}
								maxLength={11}
							/>
							<FloatInput
								label="Password"
								value={password}
								setValue={setPassword}
								password={true}
							/>
							<FloatInput
								label="Confirm Password"
								value={confirmPassword}
								setValue={setconfirmPassword}
								password={true}
							/>
							<TouchableOpacity
								style={[
									formStyles.mainBtn,
									{
										backgroundColor: colors.secondary,
										marginVertical: 20,
									},
								]}
								disabled={load}
								onPress={submitHandler}
							>
								{load ? (
									<ActivityIndicator color={"#FFF"} />
								) : (
									<Text
										style={[
											textStyles.textBold,
											{ color: "#FFF" },
										]}
									>
										Continue
									</Text>
								)}
							</TouchableOpacity>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									width: "100%",
									justifyContent: "center",
									flexWrap: "wrap",
									marginVertical: 20,
								}}
							>
								<Text
									style={[
										textStyles.textMid,
										{ color: colors.mediumGray },
									]}
								>
									By proceeding, you agree with our{" "}
								</Text>
								<Link href={"/(auth)/forgot"}>
									<TouchableOpacity>
										<Text
											style={[
												textStyles.textMid,
												{ color: colors.mildGray },
											]}
										>
											Terms and Conditions
										</Text>
									</TouchableOpacity>
								</Link>
								<Text
									style={[
										textStyles.textMid,
										{ color: colors.mediumGray },
									]}
								>
									{" "}
									and{" "}
								</Text>
								<Link href={"/(auth)/forgot"}>
									<TouchableOpacity>
										<Text
											style={[
												textStyles.textMid,
												{ color: colors.mildGray },
											]}
										>
											Privacy Policy
										</Text>
									</TouchableOpacity>
								</Link>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		</Container>
	);
};

export default Register;
