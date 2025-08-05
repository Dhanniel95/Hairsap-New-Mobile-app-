import authService from "@/redux/auth/authService";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import { displayError } from "@/utils/error";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import FloatInput from "../FloatInput";

const ResetForm = ({
	email,
	userType,
}: {
	email: string;
	userType: string;
}) => {
	const router = useRouter();

	const [load, setLoad] = useState(false);
	const [otp, setOtp] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const submitHandler = async () => {
		if (otp.length === 6) {
			if (password && password === confirmPassword) {
				try {
					let payload = {
						email,
						token: otp,
						password,
					};
					setLoad(true);
					await authService.resetPassword(payload);
					setLoad(false);
					Alert.alert(
						"Success",
						"Password successfully reset. Login to your account with your new details",
						[
							{ text: "cancel" },
							{
								text: "Ok",
								onPress: () => router.push("/login"),
							},
						]
					);
				} catch (err) {
					setLoad(false);
					displayError(err, true);
				}
			} else {
				displayError("Passwords mismatch", true);
			}
		} else {
			displayError('Please enter a valid OTP!"', true);
		}
	};

	return (
		<View style={{ marginTop: 30 }}>
			<FloatInput
				label="Email OTP"
				value={otp}
				setValue={setOtp}
				dark={true}
				number={true}
				maxLength={6}
			/>
			<FloatInput
				label="New Password"
				value={password}
				setValue={setPassword}
				dark={true}
				password={true}
			/>
			<FloatInput
				label="Confirm New Password"
				value={confirmPassword}
				setValue={setConfirmPassword}
				dark={true}
				password={true}
			/>

			<TouchableOpacity
				style={[formStyles.mainBtn, { marginTop: 25 }]}
				disabled={load}
				onPress={submitHandler}
			>
				{load ? (
					<ActivityIndicator color={"#FFF"} />
				) : (
					<Text style={[textStyles.textBold, { color: "#FFF" }]}>
						Reset
					</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default ResetForm;
