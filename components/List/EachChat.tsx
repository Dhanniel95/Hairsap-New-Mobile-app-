import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EachChat = ({
	chat,
	dark,
	onPress,
}: {
	chat: any;
	dark?: boolean;
	onPress: () => void;
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				styles.body,
				{ backgroundColor: dark ? colors.secondary : colors.white },
			]}
		>
			<Image
				source={require("../../assets/images/icon.png")}
				style={{ width: 50, height: 50, borderRadius: 25 }}
			/>
			<View style={{ marginLeft: 10, maxWidth: "80%" }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Text
						style={[
							textStyles.textMid,
							{ color: dark ? colors.white : colors.mediumGray },
						]}
					>
						{chat.name}
					</Text>
				</View>
				<Text
					style={[
						textStyles.text,
						{
							fontSize: 14,
							color: dark ? colors.white : colors.mildGray,
						},
					]}
				>
					{chat.message}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default EachChat;

const styles = StyleSheet.create({
	body: {
		flexDirection: "row",
		paddingHorizontal: 10,
		paddingVertical: 15,
		backgroundColor: colors.white,
		alignItems: "center",
		elevation: 2,
		shadowColor: "grey",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		marginBottom: 20,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.09)",
		width: "100%",
	},
});
