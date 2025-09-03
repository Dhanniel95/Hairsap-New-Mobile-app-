import authService from "@/redux/auth/authService";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import { displayError } from "@/utils/error";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import KeyboardWrapper from "../Basics/KeyboardWrapper";
import InputField from "../InputField";

const UserForm = ({
	onSubmit,
	userId,
}: {
	onSubmit: (arg: any) => void;
	userId: string;
}) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [load, setLoad] = useState(false);

	const submitHandler = async () => {
		try {
			let payload = {
				name: name.trim(),
				phone: phone.trim(),
				email,
				guestUserId: Number(userId),
				allowEmailUserExist: true,
				allowPhoneNumberUserExist: true,
			};

			let payload2 = {
				name: name.trim(),
				phone: phone.trim(),
				password: name.trim().toUpperCase().replace(/ /g, ""),
				role: "user",
			};
			setLoad(true);
			if (userId) {
				await authService.consultantGuest(payload);
			} else {
				await authService.register(payload2);
			}
			setLoad(false);
			onSubmit(payload);
		} catch (err: any) {
			setLoad(false);
			let msg = displayError(err, false);
			Alert.alert("Error", msg?.toString());
		}
	};

	return (
		<View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
			<KeyboardWrapper>
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
					label="Whatsapp Number"
					isLight={true}
					number={true}
					placeholder="Add Whatsapp Number"
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
			</KeyboardWrapper>
		</View>
	);
};

export default UserForm;
