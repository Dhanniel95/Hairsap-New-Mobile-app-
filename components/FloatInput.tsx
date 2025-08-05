import colors from "@/utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { FloatingLabelInput } from "react-native-floating-label-input";

const FloatInput = ({
	value,
	setValue,
	label,
	password,
	number,
	maxLength,
	showPassword,
	dark,
}: {
	value: string;
	setValue: (arg: string) => void;
	label: string;
	password?: boolean;
	showPassword?: boolean;
	number?: boolean;
	maxLength?: number;
	dark?: boolean;
}) => {
	return (
		<FloatingLabelInput
			isPassword={password}
			togglePassword={false}
			label={label}
			value={value}
			autoCapitalize="none"
			containerStyles={{
				padding: 15,
				marginVertical: 10,
				backgroundColor: dark ? colors.darkGray : colors.appGray,
				borderRadius: 6,
			}}
			inputStyles={{
				color: dark ? colors.lightGray : colors.dark,
				fontFamily: "medium",
			}}
			customLabelStyles={{
				colorFocused: dark ? colors.white : colors.dark,
				colorBlurred: dark ? colors.mildGray : colors.dark,
			}}
			labelStyles={{
				fontFamily: "medium",
				color: dark ? colors.white : colors.dark,
			}}
			maxLength={maxLength || 120}
			keyboardType={number ? "number-pad" : "default"}
			onChangeText={(value) => setValue(value)}
			customShowPasswordComponent={
				<MaterialCommunityIcons
					name="eye-off"
					color={dark ? colors.lightGray : colors.darkGray}
					size={18}
				/>
			}
			customHidePasswordComponent={
				<MaterialCommunityIcons
					name="eye"
					color={dark ? colors.lightGray : colors.darkGray}
					size={18}
				/>
			}
		/>
	);
};

export default FloatInput;
