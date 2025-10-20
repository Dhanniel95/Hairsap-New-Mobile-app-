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

	let newMsg = !chat.participants
		? "1"
		: chat.participants?.find((c: any) => c.userId == user.userId)
		? "1"
		: "0";

	let isBtnAllowed = chatInfo
		? newMsg === "1"
			? true
			: newMsg == "0" && chat.participants?.length === 1
			? true
			: false
		: true;

	const getInitials = (fullName: string) => {
		if (!fullName) return "";

		const parts = fullName.trim().split(/\s+/).filter(Boolean);

		const initials = parts.map((word) => word[0].toUpperCase()).join("");

		return initials;
	};

	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: "/(app)/chat",
					params: {
						chatRoomId: chatInfo?.chatRoomId || chat.chatRoomId,
						user: chat.name,
						image: chat.profilePhotoUrl,
						newMsg,
						receiverId: chat.userId,
						userType,
						chatId: chatInfo?.chatId || chat.chatId,
						createdAt: chatInfo?.createdAt,
						messageType: chatInfo?.messageType || "",
						count: chat?.unreadMessages || 0,
						isParticipant: `${isBtnAllowed}`,
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
				{chat.profilePhotoUrl ? (
					<Image
						source={{ uri: chat.profilePhotoUrl }}
						style={{ height: 50, width: 50, borderRadius: 25 }}
					/>
				) : (
					<View
						style={{
							height: 50,
							width: 50,
							borderRadius: 25,
							backgroundColor: colors.secondary,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text style={[textStyles.textBold, { color: "#FFF" }]}>
							{getInitials(chat.name)}
						</Text>
					</View>
				)}
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
								flexWrap: "wrap",
							},
						]}
						numberOfLines={5}
						ellipsizeMode="tail"
					>
						{chat.name?.substring(0, 18)}
						{chat.name?.length > 18 && "..."}
					</Text>
					<Text
						style={[
							textStyles.textMid,
							{ color: "#000E08", fontSize: 12 },
						]}
					>
						{chatInfo?.updatedAt
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
						{chatInfo?.message
							? `${chatInfo?.message?.substring(0, 40)}...`
							: `Click to Chat`}
					</Text>
					<View style={styles.count}>
						<Text style={[textStyles.textMid, { color: "#FFF" }]}>
							{chat.unreadMessages}
						</Text>
					</View>
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
