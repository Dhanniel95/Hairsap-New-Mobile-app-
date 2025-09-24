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
				confirmSelectItem={true}
				renderRightIcon={() => (
					<Entypo
						name="chevron-with-circle-down"
						size={20}
						color={"#000"}
						style={{ marginRight: 5 }}
					/>
				)}
				selectedStyle={styles.selectedStyle}
				alwaysRenderSelectedItem={true}
				itemTextStyle={{ fontSize: 13 }}
				renderSelectedItem={(item, unSelect) => (
					<View style={styles.selectedStyle}>
						<Text
							style={styles.selectedTextStyle}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{item.label}
						</Text>
						<Entypo
							name="circle-with-cross"
							color={"#134E4A"}
							size={15}
						/>
					</View>
				)}
			/>
		</View>
	);
};

export default MultipleSelect;

const styles = StyleSheet.create({
	container: { marginBottom: 20 },
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	selectedStyle: {
		borderRadius: 18,
		backgroundColor: "#E2FFCF",
		fontSize: 9,
		paddingHorizontal: 10,
		paddingVertical: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
		marginRight: 5,
	},
	selectedTextStyle: {
		fontSize: 12,
		color: "#134E4A",
		fontFamily: "bold",
		maxWidth: 150,
		marginRight: 20,
	},
});
