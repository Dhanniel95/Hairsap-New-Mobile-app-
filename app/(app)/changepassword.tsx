import InputField from "@/components/Basics/InputField";
import KeyboardWrapper from "@/components/Basics/KeyboardWrapper";
import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import authService from "@/redux/auth/authService";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { displayError, displaySuccess } from "@/utils/error";
import { useAppSelector } from "@/utils/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const ChangePassword = () => {
	const { user } = useAppSelector((state) => state.auth);

	const params = useLocalSearchParams();

	const router = useRouter();

	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (params?.new == "true") {
			setPassword("password");
		}
	}, [params]);

	const submitHandler = async () => {
		if (password) {
			if (newPassword && newPassword === confirmPassword) {
				try {
					let payload = {
						newPassword,
						oldPassword: password,
					};

					setLoad(true);
					await authService.changePassword(
						params?.new == "true" ? { newPassword } : payload
					);
					setLoad(false);
					displaySuccess("Password successfully updated");
					if (params?.new == "true" && user.role === "user") {
						router.replace("/(tabs-user)/gallery");
					}
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
					{params?.new != "true" && (
						<InputField
							label="Old Password"
							value={password}
							setValue={setPassword}
							password={true}
						/>
					)}
					<InputField
						label="New Password"
						value={newPassword}
						setValue={setNewPassword}
						password={true}
					/>
					<InputField
						label="Confirm New Password"
						value={confirmPassword}
						setValue={setConfirmPassword}
						password={true}
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
