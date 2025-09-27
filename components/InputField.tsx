import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import React from "react";
import { Text, TextInput, View } from "react-native";

const InputField = ({
	val,
	setVal,
	label,
	placeholder,
	number,
	maxLength,
	password,
	isLight,
	editable,
	multi,
	noMargin,
}: {
	val: string;
	setVal: (arg: string) => void;
	label?: string;
	placeholder?: string;
	number?: boolean;
	password?: boolean;
	maxLength?: number;
	isLight?: boolean;
	editable?: boolean;
	multi?: boolean;
	noMargin?: boolean;
}) => {
	return (
		<View style={{ marginBottom: noMargin ? 0 : 20 }}>
			{label && (
				<Text
					style={[
						textStyles.text,
						{
							fontSize: 14,
							color: isLight ? "#FFF" : colors.dark,
							marginBottom: 5,
						},
					]}
				>
					{label}
				</Text>
			)}
			<TextInput
				value={val}
				onChangeText={setVal}
				style={[formStyles.input, { height: multi ? 80 : 50 }]}
				placeholder={placeholder || ""}
				placeholderTextColor={"rgba(0,0,0,0.6)"}
				keyboardType={number ? "number-pad" : "default"}
				secureTextEntry={password}
				maxLength={maxLength || 200}
				editable={editable}
				multiline={multi ? true : false}
				numberOfLines={4}
			/>
		</View>
	);
};

export default InputField;
