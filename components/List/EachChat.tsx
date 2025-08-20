import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { formatChatDate } from "@/utils/datetime";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EachChat = ({ chat }: { chat: any }) => {
	let chatInfo = chat?.chat;

	return (
		<TouchableOpacity
			style={[
				styles.body,
				{
					backgroundColor:
						chat.involvedUsers?.length > 0
							? colors.white
							: "#CCFBF180",
				},
			]}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: 10,
				}}
			>
				<Text
					style={[
						textStyles.textBold,
						{ color: "#000E08", fontSize: 16, maxWidth: "80%" },
					]}
				>
					{chat.name}
				</Text>
				<Text
					style={[
						textStyles.textMid,
						{ color: "#000E08", fontSize: 14 },
					]}
				>
					{formatChatDate(chatInfo.updatedAt)}
				</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Text
					style={[
						textStyles.text,
						{
							maxWidth: "80%",
							fontSize: 14,
							color: "#797C7B",
						},
					]}
				>
					{chatInfo?.message?.substring(0, 60)}...
				</Text>
				<View style={styles.count}>
					<Text style={[textStyles.textMid, { color: "#FFF" }]}>
						0
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default EachChat;

const styles = StyleSheet.create({
	body: {
		paddingHorizontal: 15,
		paddingVertical: 15,
		backgroundColor: colors.white,
		marginBottom: 15,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.09)",
		width: "100%",
	},
	count: {
		backgroundColor: colors.primary,
		height: 30,
		width: 30,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},
});
