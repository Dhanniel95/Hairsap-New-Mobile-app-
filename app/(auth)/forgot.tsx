import ForgotForm from "@/components/Auth/ForgotForm";
import ResetForm from "@/components/Auth/ResetForm";
import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import textStyles from "@/styles/textStyles";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View,
} from "react-native";
import Logo from "../../assets/images/logo.svg";

const Forgot = () => {
	const [email, setEmail] = useState("");
	const [userType, setUserType] = useState("user");
	const [step, setStep] = useState(1);

	return (
		<Container dark={false} bg="#022220">
			<LinearGradient
				colors={["#02302E", "#022220", "#000000"]}
				style={{ flex: 1, paddingTop: 20 }}
			>
				<GoBack />
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
								{/* <Image
									source={require("../../assets/images/logo.svg")}
									style={{ height: 30, width: 130 }}
								/> */}
								<Logo width={150} />
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
									Forgot Password
								</Text>
								<Text
									style={[
										textStyles.text,
										{ color: "#FFF", textAlign: "center" },
									]}
								>
									Please enter an email address to receive OTP
								</Text>
							</View>
							{step === 1 ? (
								<ForgotForm
									email={email}
									setEmail={setEmail}
									userType={userType}
									setUserType={setUserType}
									onNext={() => setStep(2)}
								/>
							) : (
								<ResetForm email={email} userType={userType} />
							)}
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		</Container>
	);
};

export default Forgot;
