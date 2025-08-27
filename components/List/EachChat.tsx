import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { formatChatDate } from "@/utils/datetime";
import { useAppSelector } from "@/utils/hooks";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EachChat = ({ chat, userType }: { chat: any; userType?: string }) => {
	const { user } = useAppSelector((state) => state.auth);

	const router = useRouter();

	let chatInfo = chat?.chat;

	return chat?.chat ? (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: "/(app)/chat",
					params: {
						chatRoomId: chatInfo?.chatRoomId,
						user: chat.name,
						image: chat.profilePhotoUrl,
						newMsg: chat.participants?.find(
							(c: any) => c.userId == user.userId
						)
							? "1"
							: "0",
						receiverId: chat.userId,
						userType,
						chatId: chatInfo.chatId,
						createdAt: chatInfo?.createdAt,
						messageType: chatInfo.messageType,
						message: chatInfo.message,
					},
				})
			}
			style={[
				styles.body,
				{
					backgroundColor:
						chat.participants?.length > 1
							? colors.white
							: "#CCFBF180",
				},
			]}
		>
			<View style={{ marginRight: 10 }}>
				<Image
					source={
						chat.profilePhotoUrl
							? { uri: chat.profilePhotoUrl }
							: require("../../assets/images/profile.jpg")
					}
					style={{ height: 60, width: 60, borderRadius: 30 }}
				/>
			</View>
			<View style={{ width: "80%" }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 5,
					}}
				>
					<Text
						style={[
							textStyles.textBold,
							{
								color: "#000E08",
								fontSize: 15,
								textTransform: "capitalize",
							},
						]}
					>
						{chat.name}
					</Text>
					<Text
						style={[
							textStyles.textMid,
							{ color: "#000E08", fontSize: 12 },
						]}
					>
						{chatInfo.updatedAt
							? formatChatDate(chatInfo.updatedAt)
							: ""}
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
								fontSize: 12,
								color: "#797C7B",
							},
						]}
					>
						{chatInfo?.message?.substring(0, 40)}...
					</Text>
					<View style={styles.count}>
						<Text style={[textStyles.textMid, { color: "#FFF" }]}>
							{chat.unreadMessages}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	) : (
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
			<View style={{ marginRight: 10 }}>
				<Image
					source={
						chat.profilePhotoUrl
							? { uri: chat.profilePhotoUrl }
							: require("../../assets/images/profile.jpg")
					}
					style={{ height: 60, width: 60, borderRadius: 30 }}
				/>
			</View>
			<View style={{ maxWidth: "80%" }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 5,
					}}
				>
					<Text
						style={[
							textStyles.textBold,
							{
								color: "#000E08",
								fontSize: 15,
								textTransform: "capitalize",
							},
						]}
					>
						{chat.name}
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
								fontSize: 13,
								color: "#797C7B",
							},
						]}
					>
						Click to Chat
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
		flexDirection: "row",
		alignItems: "center",
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
