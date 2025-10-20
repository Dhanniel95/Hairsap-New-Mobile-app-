import authService from "@/redux/auth/authService";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import { displayError, displaySuccess } from "@/utils/error";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputField from "../InputField";

const UserForm = ({
	onSubmit,
	userId,
	inChat,
}: {
	onSubmit: () => void;
	userId: string;
	inChat?: boolean;
}) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [load, setLoad] = useState(false);
	const [details, setDetails] = useState<any>({});
	const [magicLink, setMagicLink] = useState("");

	const submitHandler = async () => {
		try {
			let payload = {
				name: name.trim(),
				phone: phone.trim(),
				email: email ? email.toLowerCase() : "",
			};
			setLoad(true);
			let res = await authService.consultantGuest(payload);
			setLoad(false);
			if (res?.user) {
				setDetails(res.user);
			}
		} catch (err: any) {
			setLoad(false);
			let msg = displayError(err, false);
			Alert.alert("Error", msg?.toString());
		}
	};

	const linkHandler = async () => {
		try {
			setLoad(true);
			if (inChat) {
				await authService.linkUser({
					userId: details.userId,
					guestUserId: Number(userId),
				});
				let res = await authService.exchangeToken(
					details.userId,
					userId
				);
				console.log(res, "RES");
				onSubmit();
			} else {
				let res = await authService.generateToken(details.userId);
				setMagicLink(res?.data);
			}
		} catch (err: any) {
			setLoad(false);
			let msg = displayError(err, false);
			Alert.alert("Error", msg?.toString());
		}
	};

	const copyToClipboard = async () => {
		await Clipboard.setStringAsync(magicLink);
		displaySuccess("", "Copied!");
	};

	return (
		<KeyboardAwareScrollView
			enableAutomaticScroll={true}
			showsVerticalScrollIndicator={false}
			enableOnAndroid={true}
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={{}}
		>
			{details?.userId ? (
				<View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
					<Text
						style={[
							textStyles.text,
							{ color: "#FFF", fontStyle: "italic" },
						]}
					>
						The customer account, {details.name} has been saved.
					</Text>
					{magicLink ? (
						<TouchableOpacity
							onPress={copyToClipboard}
							style={[formStyles.mainBtn, { marginTop: 20 }]}
						>
							<Feather name="copy" size={20} color={"#FFF"} />
							<Text
								style={[
									textStyles.textBold,
									{
										color: "#FFF",
										marginLeft: 8,
										fontSize: 14,
									},
								]}
							>
								Copy Magic Link
							</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={linkHandler}
							style={[formStyles.mainBtn, { marginTop: 20 }]}
						>
							{load ? (
								<ActivityIndicator color={"#FFF"} />
							) : (
								<Text
									style={[
										textStyles.textMid,
										{ color: "#FFF" },
									]}
								>
									{inChat ? "Link User" : "Get Login Link"}
								</Text>
							)}
						</TouchableOpacity>
					)}
				</View>
			) : (
				<View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
					<InputField
						val={name}
						setVal={setName}
						label="Name"
						isLight={true}
						placeholder="Add User's Name"
					/>
					<InputField
						val={email}
						setVal={setEmail}
						label="Email"
						isLight={true}
						placeholder="Add User's email"
					/>
					<InputField
						val={phone}
						setVal={setPhone}
						label="Phone Number"
						isLight={true}
						number={true}
						placeholder="Add Phone Number"
					/>
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={submitHandler}
						style={[formStyles.mainBtn, { marginTop: 20 }]}
					>
						{load ? (
							<ActivityIndicator color={"#FFF"} />
						) : (
							<Text
								style={[
									textStyles.textMid,
									{ marginLeft: 10, color: "#FFF" },
								]}
							>
								Create User
							</Text>
						)}
					</TouchableOpacity>
				</View>
			)}
		</KeyboardAwareScrollView>
	);
};

export default UserForm;
