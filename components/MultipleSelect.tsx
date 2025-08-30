import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

const MultipleSelect = ({
	placeholder,
	value,
	setValue,
	label,
	isLight,
	data,
}: {
	placeholder?: string;
	value: any;
	setValue: (arg: any) => void;
	data: { label: string; value: string }[];
	label?: string;
	isLight?: boolean;
}) => {
	return (
		<View style={styles.container}>
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
			<MultiSelect
				style={[formStyles.input]}
				placeholderStyle={[textStyles.textMid, { fontSize: 14 }]}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				search
				data={data}
				labelField="label"
				valueField="value"
				placeholder={placeholder || ""}
				searchPlaceholder="Search..."
				value={value}
				onChange={(item) => {
					setValue(item);
				}}
				renderRightIcon={() => (
					<Entypo
						name="chevron-with-circle-down"
						size={20}
						color={"#000"}
						style={{ marginRight: 5 }}
					/>
				)}
				selectedStyle={styles.selectedStyle}
			/>
		</View>
	);
};

export default MultipleSelect;

const styles = StyleSheet.create({
	container: { marginBottom: 20 },
	selectedTextStyle: {
		fontSize: 14,
		color: "#134E4A",
		fontFamily: "medium",
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	selectedStyle: {
		borderRadius: 12,
		backgroundColor: "#E2FFCF",
	},
});
