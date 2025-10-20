import chatService from "@/redux/chat/chatService";
import colors from "@/utils/colors";
import { mapChatToGifted } from "@/utils/data";
import { displayError } from "@/utils/error";
import { useAppSelector } from "@/utils/hooks";
import { getSocket } from "@/utils/socket";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import {
	Bubble,
	Composer,
	GiftedChat,
	IMessage,
	InputToolbar,
	Send,
} from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatImage from "./ChatImage";
import ChatVideo from "./ChatVideo";
import ConsultantMenu from "./ConsultantMenu";
import FileMenu from "./FileMenu";
import GalleryCheck from "./GalleryCheck";
import ItemChat from "./ItemChat";
import ReceiptChat from "./ReceiptChat";

const MainChat = ({ chatInfo }: { chatInfo?: any }) => {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [showMenu, setShowMenu] = useState(false);
	const [showDoc, setShowDoc] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const socket = getSocket();

	const { user } = useAppSelector((state) => state.auth);
	const { userChatRoomId } = useAppSelector((state) => state.chat);

	useEffect(() => {
		fetchMessages(true);
	}, [userChatRoomId]);

	useEffect(() => {
		if (!socket) return;

		if (chatInfo?.newMsg === "0" && user?.role === "consultant") {
			joinRoom();
		}

		socket.on("message:new", (data) => {
			let chatInfo = data?.data;
			if (chatInfo?.chatId) {
				setMessages((previousMessages) =>
					GiftedChat.append(previousMessages, [
						mapChatToGifted(chatInfo),
					])
				);
			}
		});

		socket.on("message:new:customer", (data) => {
			let chatInfo = data?.data?.chat;
			if (chatInfo?.chatId) {
				setMessages((previousMessages) =>
					GiftedChat.append(previousMessages, [
						mapChatToGifted(data?.data?.chat),
					])
				);
			}
		});
		socket.on("message:new:guest", (data) => {
			let chatInfo = data?.data?.chat;
			if (chatInfo?.chatId) {
				setMessages((previousMessages) =>
					GiftedChat.append(previousMessages, [
						mapChatToGifted(data?.data?.chat),
					])
				);
			}
		});
	}, []);

	const readLastMessages = async (msgs: any) => {
		if (chatInfo?.chatId) {
			let findMyMsgs = msgs?.filter(
				(m: any) => m.user._id != user.userId
			);
			let notSeen = findMyMsgs?.slice(0, chatInfo?.count || 1);
			if (socket?.connected) {
				notSeen.map((msg: any) => {
					socket.emit(
						"message:read",
						Number(msg._id),
						(response: any) => console.log(response, "response")
					);
				});
			}
		}
	};

	const fetchMessages = async (readLast?: boolean) => {
		if (chatInfo?.chatRoomId || userChatRoomId) {
			try {
				let res = await chatService.listChatMessages({
					cursor: 0,
					take: 100,
					desc: true,
					chatRoomId:
						Number(chatInfo.chatRoomId) || Number(userChatRoomId),
				});
				if (Array.isArray(res?.data?.messages)) {
					let formatted = res.data.messages.map(mapChatToGifted);
					setMessages(formatted);
					if (readLast) {
						readLastMessages(formatted);
					}
				} else {
					setMessages([]);
				}
			} catch (err) {}
		}
	};

	const onSend = useCallback((newMessages: IMessage[] = []) => {
		let chatMsg = newMessages[0];
		if (socket?.connected) {
			socket.emit("message:new", {
				message: chatMsg.text,
				messageType: "text",
				receiverId: chatInfo.receiverId
					? Number(chatInfo.receiverId)
					: undefined,
				chatRoomId: chatInfo.chatRoomId
					? Number(chatInfo.chatRoomId)
					: undefined,
			});
		}
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, newMessages)
		);
	}, []);

	const fromMedia = async (obj: any) => {
		setShowDoc(false);
		let tempId = Math.random().toString(36).substring(7);
		let payload = {
			_id: tempId,
			text: obj.text,
			createdAt: new Date(),
			user: {
				_id: user.userId,
				name: user.name,
				avatar: user.faceIdPhotoUrl,
			},
			video: obj.type === "videos" ? obj.url : undefined,
			image: obj.type === "images" ? obj.url : undefined,
			pending: true,
		};
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, [payload])
		);

		try {
			const formData = new FormData();
			formData.append(obj.type == "images" ? "chatphoto" : "chatvideo", {
				uri: obj.url,
				type: obj.type == "images" ? "image/jpeg" : "video/mp4",
				name: obj.type == "images" ? "chatphoto.jpg" : "chatvideo.mp4",
			} as any);
			let res;
			if (obj.type === "images") {
				res = await chatService.uploadImage(formData);
			} else {
				res = await chatService.uploadVideo(formData);
			}
			if (res?.data?.url) {
				setMessages((prev) =>
					prev.map((msg) =>
						msg._id === tempId
							? {
									...msg,
									video:
										obj.type === "videos"
											? res.data.url
											: undefined,
									image:
										obj.type === "images"
											? res.data.url
											: undefined,
									pending: false,
							  }
							: msg
					)
				);
				if (socket?.connected) {
					socket.emit("message:new", {
						message: obj.text,
						messageType: obj.type === "videos" ? "video" : "photo",
						media: [
							{
								thumbnail: obj.thumbnail,
								url: res.data.url,
							},
						],
						receiverId: chatInfo.receiverId
							? Number(chatInfo.receiverId)
							: undefined,
						chatRoomId: chatInfo.chatRoomId
							? Number(chatInfo.chatRoomId)
							: undefined,
					});
				}
			}
		} catch (err) {
			displayError("Upload Failed", true);
			setMessages((prev) => prev.filter((msg) => msg._id !== tempId));
		}
	};

	const joinRoom = () => {
		if (socket?.connected) {
			socket.emit("chatroom:join", Number(chatInfo.chatRoomId));
		}
	};

	const renderSend = (props: any) => {
		return (
			<View
				style={{
					width: "20%",
					justifyContent: "flex-end",
					alignItems: "flex-end",
				}}
			>
				<Send {...props} containerStyle={styles.sendContainer}>
					<View style={styles.sendBtn}>
						<Ionicons name="send" size={20} color="#fff" />
					</View>
				</Send>
			</View>
		);
	};

	const renderInputToolbar = (props: any) => (
		<>
			{showMenu && (
				<ConsultantMenu
					allowUserCreate={
						chatInfo?.userType === "guest" ? true : false
					}
					allowBooking={chatInfo?.userType === "user" ? true : false}
					userId={chatInfo.receiverId}
				/>
			)}
			{showDoc && <FileMenu onSend={fromMedia} />}
			<InputToolbar
				{...props}
				containerStyle={styles.toolbarContainer}
				primaryStyle={{
					alignItems: "center",
				}}
			/>
		</>
	);

	const renderComposer = (props: any) => {
		const isConsultant = user.role === "consultant";
		const notParticipant = chatInfo?.isParticipant === "false";

		if (isConsultant && notParticipant) {
			return <View style={{ width: "100%" }} />;
		}

		return (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					flex: 1,
					paddingVertical: 5,
				}}
				pointerEvents="box-none"
			>
				{isConsultant && (
					<TouchableOpacity
						style={{ paddingHorizontal: 8 }}
						onPress={() => setShowMenu(!showMenu)}
						activeOpacity={0.7}
					>
						<Feather name="paperclip" size={22} color="#555" />
					</TouchableOpacity>
				)}

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						backgroundColor: "#F3F6F6",
						borderRadius: 20,
						paddingHorizontal: 10,
						marginRight: 10,
						flex: 1,
					}}
					pointerEvents="box-none"
				>
					<Composer
						{...props}
						textInputStyle={{
							color: "black",
							flex: 1,
							minHeight: 40,
							maxHeight: 100,
							paddingTop: 8,
							paddingBottom: 8,
						}}
						textInputProps={{
							editable: true,
							multiline: true,
							returnKeyType: "default",
							enablesReturnKeyAutomatically: true,
						}}
						placeholder="Type a message..."
					/>

					<TouchableOpacity
						onPress={() => setShowDoc(!showDoc)}
						style={{ paddingLeft: 6 }}
						activeOpacity={0.7}
					>
						<Ionicons
							name="documents-outline"
							size={22}
							color="#555"
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	const renderMessageVideo = useCallback(
		({ currentMessage }: { currentMessage?: IMessage }) => {
			if (!currentMessage?.video) return null;

			return (
				<ChatVideo
					uri={String(currentMessage.video)}
					load={currentMessage.pending || false}
				/>
			);
		},
		[]
	);

	const renderMessageImage = useCallback(
		({ currentMessage }: { currentMessage?: IMessage }) => {
			if (!currentMessage?.image) return null;

			return (
				<ChatImage
					uri={String(currentMessage.image)}
					load={currentMessage.pending || false}
				/>
			);
		},
		[]
	);

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: "#fff" }}
			edges={["bottom"]}
		>
			<View style={{ flex: 1 }}>
				<GiftedChat
					messages={messages}
					onSend={onSend}
					user={{
						_id: user.userId,
						name: user.name,
						avatar: user.faceIdPhotoUrl,
					}}
					showUserAvatar
					alwaysShowSend
					renderAvatar={null}
					showAvatarForEveryMessage={false}
					renderSend={renderSend}
					renderComposer={renderComposer}
					renderInputToolbar={renderInputToolbar}
					renderMessageImage={renderMessageImage}
					renderMessageVideo={renderMessageVideo}
					isKeyboardInternallyHandled={true}
					renderChatEmpty={() =>
						user.role === "consultant" || user.role === "pro" ? (
							<></>
						) : (
							<GalleryCheck />
						)
					}
					renderBubble={(props: any) =>
						props.currentMessage.messageType === "receipt" ? (
							<ReceiptChat
								metadata={props.currentMessage.metaData}
								isUser={props.position === "right"}
							/>
						) : props.currentMessage.messageType === "item" ? (
							<ItemChat
								metadata={props.currentMessage.metaData}
								isUser={props.position === "right"}
							/>
						) : (
							<Bubble
								{...props}
								wrapperStyle={{
									right: {
										backgroundColor: colors.primary,
										borderRadius: 12,
										padding: 5,
									},
									left: {
										backgroundColor: "#F2F7FB",
										borderRadius: 12,
										padding: 5,
									},
								}}
								textStyle={{
									right: {
										color: "#fff",
									},
									left: {
										color: "#000",
									},
								}}
							/>
						)
					}
					keyboardShouldPersistTaps="handled"
					bottomOffset={Platform.OS === "ios" ? 0 : 0}
					renderLoading={() => (
						<ActivityIndicator
							size="large"
							color={colors.primary}
						/>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default MainChat;

const styles = StyleSheet.create({
	toolbarContainer: {
		paddingLeft: 20,
		paddingHorizontal: 10,
		paddingTop: 10,
		borderTopWidth: 1,
		borderTopColor: "#ddd",
		width: "100%",
	},
	composerWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F3F6F6",
		borderRadius: 20,
		paddingHorizontal: 10,
		marginRight: 20,
		height: 50,
	},
	customComposer: {
		fontSize: 16,
		lineHeight: 20,
		paddingVertical: 8,
		flex: 1,
	},
	sendContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginRight: 5,
	},
	sendBtn: {
		backgroundColor: colors.primary,
		height: 40,
		width: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
});
