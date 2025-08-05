import textStyles from "@/styles/textStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GoBack = ({
	iconColor,
	bgColor,
	title,
}: {
	iconColor?: string;
	bgColor?: string;
	title?: string;
}) => {
	const router = useRouter();

	return (
		<View
			style={{
				paddingVertical: 5,
				paddingHorizontal: 20,
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<TouchableOpacity
				onPress={() => router.back()}
				style={[styles.pos, { backgroundColor: bgColor || "#EBF4F8" }]}
			>
				<MaterialCommunityIcons
					name="reply"
					size={18}
					color={iconColor || "#0c0c0c"}
				/>
			</TouchableOpacity>
			<Text style={[textStyles.textBold, { fontSize: 16 }]}>{title}</Text>
			<View />
		</View>
	);
};

export default GoBack;

const styles = StyleSheet.create({
	pos: {
		height: 45,
		width: 45,
		borderRadius: 45 / 2,
		justifyContent: "center",
		alignItems: "center",
		padding: 7,
	},
});
