import authService from "@/redux/auth/authService";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import { displayError } from "@/utils/error";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import KeyboardWrapper from "../Basics/KeyboardWrapper";
import InputField from "../InputField";

const UserForm = ({ onSubmit }: { onSubmit: (arg: any) => void }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [load, setLoad] = useState(false);

	const submitHandler = async () => {
		try {
			let payload = {
				name: name.trim(),
				phone: phone.trim(),
				password: name.trim().toUpperCase(),
				role: "user",
			};
			setLoad(true);
			await authService.register(payload);
			setLoad(false);
			onSubmit(payload);
		} catch (err) {
			setLoad(false);
			displayError(err, true);
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
