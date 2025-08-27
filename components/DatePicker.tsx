import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = ({
	placeholder,
	isLight,
	label,
	date,
	setDate,
}: {
	placeholder?: string;
	isLight?: boolean;
	label?: string;
	date: any;
	setDate: (arg: any) => void;
}) => {
	const [open, setOpen] = useState(false);

	const handleConfirm = (date: any) => {
		setDate(date);
		setOpen(false);
	};

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
			<TouchableOpacity
				activeOpacity={0.8}
				style={[formStyles.input, { justifyContent: "center" }]}
				onPress={() => setOpen(true)}
			>
				<Text style={[textStyles.textMid, { fontSize: 14 }]}>
					{placeholder || "Select Date and Time"}
				</Text>
			</TouchableOpacity>
			<DateTimePickerModal
				isVisible={open}
				mode="datetime"
				onConfirm={handleConfirm}
				onCancel={() => setOpen(false)}
			/>
		</View>
	);
};

export default DatePicker;

const styles = StyleSheet.create({});
