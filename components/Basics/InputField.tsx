import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import React from "react";
import { Text, TextInput, View } from "react-native";

const InputField = ({
	value,
	setValue,
	label,
	password,
	maxLength,
	number,
	placeholder,
	onBlur,
	noneditable,
	multi,
	autoCapitalize,
	reef,
}: {
	value: string;
	setValue: (arg: string) => void;
	label?: string;
	password?: boolean;
	maxLength?: number;
	number?: boolean;
	placeholder?: string;
	onBlur?: (arg: any) => void;
	noneditable?: string;
	multi?: boolean;
	reef?: any;
	autoCapitalize?: "characters" | "sentences" | "words";
}) => {
	return (
		<View style={{ marginBottom: 15 }}>
			{label && (
				<Text
					style={[textStyles.text, { fontSize: 14, marginBottom: 3 }]}
				>
					{label}
				</Text>
			)}
			<TextInput
				value={value}
				onChangeText={setValue}
				style={[
					formStyles.input,
					{
						height: multi ? 120 : 50,
					},
				]}
				secureTextEntry={password ? true : false}
				maxLength={maxLength || 200}
				keyboardType={number ? "number-pad" : "default"}
				placeholder={placeholder || ""}
				placeholderTextColor={"rgba(0,0,0,0.7)"}
				onEndEditing={onBlur}
				editable={noneditable == "true" ? false : true}
				multiline={multi ? true : false}
				numberOfLines={4}
				ref={reef}
				autoCapitalize={autoCapitalize || "none"}
			/>
		</View>
	);
};

export default InputField;
