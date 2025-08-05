import authService from "@/redux/auth/authService";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { displayError } from "@/utils/error";
import React, { useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import FloatInput from "../FloatInput";

const ForgotForm = ({
	email,
	setEmail,
	userType,
	setUserType,
	onNext,
}: {
	email: string;
	setEmail: (arg: string) => void;
	userType: string;
	setUserType: (arg: string) => void;
	onNext: () => void;
}) => {
	const [loading, setLoading] = useState(false);

	const submitHandler = async () => {
		if (email) {
			try {
				let payload = {
					email,
					role: userType,
				};
				setLoading(true);
				await authService.forgotPassword(payload);
				setLoading(false);
				onNext();
			} catch (err) {
				setLoading(false);
				displayError(err, true);
			}
		} else {
			displayError("Please enter your email address", true);
		}
	};

	return (
		<View style={{ marginTop: 30 }}>
			<FloatInput
				label="Email Address"
				value={email}
				setValue={setEmail}
				dark={true}
			/>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					marginVertical: 25,
				}}
			>
				<TouchableOpacity
					onPress={() => setUserType("user")}
					activeOpacity={0.8}
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<View style={styles.radio}>
						{userType === "user" && (
							<View style={styles.radioActive} />
						)}
					</View>
					<Text
						style={[
							textStyles.textMid,
							{
								color:
									userType === "user"
										? colors.primary
										: colors.white,
							},
						]}
					>
						Customer
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
					activeOpacity={0.8}
					onPress={() => setUserType("pro")}
				>
					<View style={styles.radio}>
						{userType === "pro" && (
							<View style={styles.radioActive} />
						)}
					</View>
					<Text
						style={[
							textStyles.textMid,
							{
								color:
									userType === "pro"
										? colors.primary
										: colors.white,
							},
						]}
					>
						Hairsap Pro
					</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={[formStyles.mainBtn, { marginTop: 25 }]}
				disabled={loading}
				onPress={submitHandler}
			>
				{loading ? (
					<ActivityIndicator color={"#FFF"} />
				) : (
					<Text style={[textStyles.textBold, { color: "#FFF" }]}>
						Submit
					</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default ForgotForm;

const styles = StyleSheet.create({
	radio: {
		borderWidth: 2,
		height: 30,
		width: 30,
		borderRadius: 15,
		borderColor: colors.primary,
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	radioActive: {
		backgroundColor: colors.primary,
		height: 20,
		width: 20,
		borderRadius: 10,
	},
});
