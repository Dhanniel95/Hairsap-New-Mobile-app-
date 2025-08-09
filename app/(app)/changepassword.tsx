import InputField from "@/components/Basics/InputField";
import KeyboardWrapper from "@/components/Basics/KeyboardWrapper";
import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import authService from "@/redux/auth/authService";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { displayError, displaySuccess } from "@/utils/error";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const ChangePassword = () => {
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [load, setLoad] = useState(false);

	const submitHandler = async () => {
		if (password) {
			if (newPassword && newPassword === confirmPassword) {
				try {
					let payload = {
						newPassword,
						oldPassword: password,
					};

					setLoad(true);
					await authService.changePassword(payload);
					setLoad(false);
					displaySuccess("Password successfully updated");
				} catch (err) {
					setLoad(false);
					displayError(err, true);
				}
			} else {
				displayError("Passwords Mismatch", true);
			}
		}
	};

	return (
		<Container dark={true} bg="#FFF">
			<GoBack
				bgColor={colors.dark}
				iconColor={colors.white}
				title="Change Password"
			/>
			<View
				style={{
					flex: 1,
					paddingHorizontal: "8%",
					paddingVertical: 40,
				}}
			>
				<KeyboardWrapper>
					<InputField
						label="Old Password"
						value={password}
						setValue={setPassword}
					/>
					<InputField
						label="New Password"
						value={newPassword}
						setValue={setNewPassword}
					/>
					<InputField
						label="Confirm New Password"
						value={confirmPassword}
						setValue={setConfirmPassword}
					/>
					<TouchableOpacity
						style={[
							formStyles.mainBtn,
							{
								backgroundColor: colors.secondary,
								marginTop: 20,
							},
						]}
						disabled={load}
						onPress={submitHandler}
					>
						{load ? (
							<ActivityIndicator color={"#FFF"} />
						) : (
							<Text
								style={[textStyles.textBold, { color: "#FFF" }]}
							>
								Reset
							</Text>
						)}
					</TouchableOpacity>
				</KeyboardWrapper>
			</View>
		</Container>
	);
};

export default ChangePassword;
