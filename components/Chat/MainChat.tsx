import chatService from "@/redux/chat/chatService";
import { saveChatId } from "@/redux/chat/chatSlice";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import baseUrl from "@/utils/config";
import { mapChatToGifted } from "@/utils/data";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	Platform,
	StyleSheet,
	Text,
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
import { io, Socket } from "socket.io-client";
import ChatVideo from "./ChatVideo";
import ConsultantMenu from "./ConsultantMenu";
import GalleryCheck from "./GalleryCheck";

const MainChat = ({ chatInfo }: { chatInfo?: any }) => {
	const dispatch = useAppDispatch();

	const [messages, setMessages] = useState<IMessage[]>([]);
	const [showMenu, setShowMenu] = useState(false);
	const [showDoc, setShowDoc] = useState(false);

	const socketRef = useRef<Socket | null>(null);

	const { user } = useAppSelector((state) => state.auth);
	const { userChatRoomId } = useAppSelector((state) => state.chat);

	useEffect(() => {
		loadLastMessage();
	}, []);

	useEffect(() => {
		let socket: Socket;

		const connectSocket = async () => {
			const token = (await AsyncStorage.getItem("@accesstoken")) || "";

			socket = io(baseUrl, {
				query: { token, role: user.role },
				transports: ["websocket"],
			});

			socketRef.current = socket;

			socket.on("connect", () => {
				console.log("Connected to socket:", socket.id);

				if (chatInfo?.video) {
					consultHandler();
				}
			});

			socket.on("disconnect", () => {
				console.log("Disconnected from socket");
			});

			socket.on("connect_error", (err) => {
				console.log(" Socket connection error:", err.message);
			});

			socket.onAny((event, ...args) => {
				console.log("Got event:", event, args);
			});

			// receive messages
			socket.on("message:new", (data) => {
				console.log("New message received:", data);
				fetchMessages();
			});

			socket.on("message:new:customer", (data) => {
				console.log("New message received:", data);
				fetchMessages();
			});
		};

		connectSocket();
		fetchMessages();

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
			}
		};
	}, [chatInfo]);

	const loadLastMessage = () => {
		let payload = {
			chatId: chatInfo.chatId,
			message: chatInfo.message,
			createdAt: chatInfo.createdAt,
			senderId: chatInfo.receiverId,
			messageType: chatInfo.messageType,
		};
		setMessages([mapChatToGifted(payload)]);
	};

	const fetchMessages = async () => {
		if (chatInfo.chatRoomId || userChatRoomId) {
			try {
				let res = await chatService.listChatMessages({
					cursor: 0,
					take: 20,
					desc: true,
					chatRoomId:
						Number(chatInfo.chatRoomId) || Number(userChatRoomId),
				});
				if (Array.isArray(res?.data)) {
					let formatted = res.data.map(mapChatToGifted);
					setMessages(formatted);
				}
			} catch (err) {}
		}
	};

	const onSend = useCallback((newMessages: IMessage[] = []) => {
		let chatMsg = newMessages[0];
		if (socketRef.current?.connected) {
			socketRef.current.emit("message:new", {
				message: chatMsg.text,
				messageType: "text",
				receiverId: chatInfo.receiverId
					? Number(chatInfo.receiverId)
					: undefined,
				chatRoomId: Number(chatInfo.chatRoomId),
			});
		}
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, newMessages)
		);
	}, []);

	const consultHandler = () => {
		let payload = {
			_id: Math.random().toString(36).substring(7),
			text: chatInfo.text || "Consultation Request",
			createdAt: new Date(),
			user: {
				_id: user.userId,
				name: user.name,
				avatar: user.faceIdPhotoUrl,
			},
			video: chatInfo.video,
		};
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, [payload])
		);
		if (socketRef.current?.connected) {
			socketRef.current.emit(
				"message:new",
				{
					message: chatInfo.text || "Consultation Request",
					messageType: "video",
					media: [
						{
							thumbnail: chatInfo.thumbnail,
							url: chatInfo.video,
						},
					],
				},
				(response: any) => {
					console.log(response, "RESPONSE");
					if (response?.data) {
						dispatch(saveChatId(response.data?.chatRoomId));
					}
				}
			);
		}
	};

	const joinRoom = () => {
		if (socketRef.current?.connected) {
			socketRef.current.emit(
				"chatroom:join",
				{
					chatRoomId: Number(chatInfo.chatRoomId),
				},
				(response: any) => console.log(response, "reponse__")
			);
		}
	};

	const createdUserHandler = (arg: any) => {
		let message = `An account has been created for you. Login with ${
			arg?.phone
		} as Phone Number and use ${arg?.name?.toUpperCase()} as Password.`;
		let payload = {
			_id: Math.random().toString(36).substring(7),
			text: message,
			createdAt: new Date(),
			user: {
				_id: user.userId,
				name: user.name,
				avatar: user.faceIdPhotoUrl,
			},
		};
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, [payload])
		);
		if (socketRef.current?.connected) {
			socketRef.current.emit(
				"message:new",
				{
					message,
					messageType: "text",
					receiverId: Number(chatInfo.receiverId),
					chatRoomId: Number(chatInfo.chatRoomId),
				},
				(response: any) => {
					fetchMessages();
				}
			);
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

	const renderInputToolbar = (props: any) =>
		chatInfo?.newMsg === "0" && user?.role === "consultan" ? (
			<View style={{ paddingHorizontal: 20 }}>
				<TouchableOpacity
					style={[formStyles.mainBtn]}
					onPress={joinRoom}
				>
					<Text style={[textStyles.textBold, { color: "#FFF" }]}>
						Join Chat
					</Text>
				</TouchableOpacity>
			</View>
		) : (
			<>
				{showMenu && (
					<ConsultantMenu
						allowUserCreate={
							chatInfo?.userType === "guest" ? true : false
						}
						allowBooking={
							chatInfo?.userType === "user" ? true : false
						}
						onSubmit={createdUserHandler}
					/>
				)}
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
		return (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					width: "80%",
				}}
			>
				{user.role === "consultant" && (
					<TouchableOpacity
						style={{ width: "10%" }}
						onPress={() => setShowMenu(!showMenu)}
					>
						<Feather name="paperclip" size={24} color="#555" />
					</TouchableOpacity>
				)}
				<View
					style={[
						styles.composerWrapper,
						{ width: user.role === "consultant" ? "95%" : "100%" },
					]}
				>
					<Composer
						{...props}
						textInputStyle={styles.customComposer}
						placeholder="Type a message..."
					/>
					<TouchableOpacity
						onPress={() => console.log("File Upload")}
					>
						<Ionicons
							name="documents-outline"
							size={24}
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

			return <ChatVideo uri={String(currentMessage.video)} />;
		},
		[]
	);

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: "#fff" }}
			edges={["bottom"]}
		>
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
				scrollToBottom
				inverted={messages.length > 0 ? true : false}
				listViewProps={{
					contentContainerStyle: {
						paddingHorizontal: 20,
					},
					ListEmptyComponent: () =>
						user.role === "user" ? <GalleryCheck /> : <></>,
				}}
				renderSend={renderSend}
				renderComposer={renderComposer}
				renderInputToolbar={renderInputToolbar}
				renderMessageVideo={renderMessageVideo}
				renderBubble={(props) => (
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
				)}
				keyboardShouldPersistTaps="handled"
				bottomOffset={Platform.OS === "ios" ? 30 : 0}
				onPress={() => {
					setShowDoc(false);
					setShowMenu(false);
				}}
				renderLoading={() => (
					<ActivityIndicator size="large" color={colors.primary} />
				)}
			/>
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
