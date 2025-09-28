import Container from "@/components/Container";
import FloatInput from "@/components/FloatInput";
import { loginUser } from "@/redux/auth/authSlice";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { registerForPushNotificationsAsync } from "@/utils/notification";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
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

const Login = () => {
	const dispatch = useAppDispatch();

	const router = useRouter();

	const { loading } = useAppSelector((state) => state.auth);

	const [pass, setPass] = useState("");
	const [phone, setPhone] = useState("");

	const submitHandler = async () => {
		if (phone && pass) {
			let res = await dispatch(
				loginUser({ phone: phone.trim(), password: pass.trim() })
			).unwrap();

			registerForPushNotificationsAsync();

			if (res?.userId && !res.faceIdPhotoUrl && res.role === "user") {
				router.push({ pathname: "/(auth)/faceverify", params: res });
			} else if (res?.userId) {
				if (res?.role === "consultant") {
					router.replace("/(tabs-consultant)/chats");
				} else if (res?.role === "pro") {
					router.replace("/(tabs-pros)/home");
				} else if (res?.role === "guest") {
					router.replace("/(tabs-guest)/gallery");
				} else {
					router.replace("/(tabs-user)/gallery");
				}
			}
		}
	};

	return (
		<Container dark={false} bg="#022220">
			<LinearGradient
				colors={["#02302E", "#022220", "#000000"]}
				style={{ flex: 1, paddingTop: 20 }}
			>
				<KeyboardAvoidingView
					style={{
						width: "100%",
						paddingTop: Platform.OS == "android" ? 30 : 0,
					}}
				>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={{ flex: 1, paddingHorizontal: "8%" }}>
							<View
								style={{ alignItems: "center", marginTop: 20 }}
							>
								<Image
									source={require("../../assets/images/logo.svg")}
									style={{ height: 30, width: 130 }}
								/>
								<Text
									style={[
										textStyles.textBold,
										{
											fontSize: 22,
											color: "#FFF",
											marginTop: 20,
										},
									]}
								>
									Welcome Back
								</Text>
								<Text
									style={[
										textStyles.text,
										{ color: "#FFF", textAlign: "center" },
									]}
								>
									Enter your phone number and password
								</Text>
							</View>
							<View style={{ marginTop: 30 }}>
								<FloatInput
									label="Phone Number"
									value={phone}
									setValue={setPhone}
									number={true}
									maxLength={11}
									dark={true}
								/>
								<FloatInput
									label="Password"
									value={pass}
									setValue={setPass}
									password={true}
									dark={true}
								/>
								<View
									style={{
										width: "100%",
										alignItems: "flex-end",
										marginTop: 10,
										marginBottom: 20,
									}}
								>
									<Link href={"/(auth)/forgot"} asChild>
										<TouchableOpacity>
											<Text
												style={[
													textStyles.textMid,
													{ color: colors.mildGray },
												]}
											>
												Forgot Password?
											</Text>
										</TouchableOpacity>
									</Link>
								</View>
								<TouchableOpacity
									style={[formStyles.mainBtn]}
									disabled={loading}
									onPress={submitHandler}
								>
									{loading ? (
										<ActivityIndicator color={"#FFF"} />
									) : (
										<Text
											style={[
												textStyles.textBold,
												{ color: "#FFF" },
											]}
										>
											Log In
										</Text>
									)}
								</TouchableOpacity>
								<View
									style={{
										marginTop: 30,
										alignItems: "center",
										alignSelf: "center",
										flexDirection: "row",
									}}
								>
									<Text
										style={{
											color: colors.lightGray,
											fontFamily: "regular",
										}}
									>
										New to Hairsap?{"  "}
									</Text>
									<Link href={"/(auth)/register"} asChild>
										<TouchableOpacity>
											<Text
												style={[
													textStyles.textMid,
													{ color: colors.mildGray },
												]}
											>
												Create an account
											</Text>
										</TouchableOpacity>
									</Link>
								</View>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		</Container>
	);
};

export default Login;
