import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import {
	MultipleSelectList,
	SelectList,
} from "react-native-dropdown-select-list";

const SelectField = ({
	placeholder,
	setValue,
	data,
	label,
	isLight,
	multiple,
}: {
	placeholder: string;
	setValue: (arg: any) => void;
	data: { key: string; value: string }[];
	label?: string;
	isLight?: boolean;
	multiple?: boolean;
}) => {
	return (
		<View style={{ marginBottom: 20 }}>
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
			{multiple ? (
				<MultipleSelectList
					setSelected={(val: any) => setValue(val)}
					data={data}
					save="key"
					boxStyles={{ backgroundColor: "#FFF", height: 50 }}
					inputStyles={{ height: 50 }}
					placeholder={placeholder}
					dropdownStyles={{ backgroundColor: "#FFF" }}
					arrowicon={
						<Entypo
							name="chevron-with-circle-down"
							size={20}
							color={"#000"}
						/>
					}
					fontFamily="medium"
				/>
			) : (
				<SelectList
					setSelected={(val: any) => setValue(val)}
					data={data}
					save="key"
					boxStyles={{ backgroundColor: "#FFF", height: 50 }}
					inputStyles={{ height: 50 }}
					placeholder={placeholder}
					dropdownStyles={{ backgroundColor: "#FFF" }}
					arrowicon={
						<Entypo
							name="chevron-with-circle-down"
							size={20}
							color={"#000"}
						/>
					}
					fontFamily="medium"
				/>
			)}
		</View>
	);
};

export default SelectField;
