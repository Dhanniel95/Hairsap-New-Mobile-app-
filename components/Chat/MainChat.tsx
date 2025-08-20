import chatService from "@/redux/chat/chatService";
import colors from "@/utils/colors";
import baseUrl from "@/utils/config";
import { mapChatToGifted } from "@/utils/data";
import { useAppSelector } from "@/utils/hooks";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
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
import GalleryCheck from "./GalleryCheck";

const MainChat = ({ chatInfo }: { chatInfo?: any }) => {
	const [messages, setMessages] = useState<IMessage[]>([]);

	const socketRef = useRef<Socket | null>(null);

	const { user } = useAppSelector((state) => state.auth);

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

				// join chat room
				if (chatInfo?.newMsg === "0") {
					socket.emit("joinRoom", {
						chatroomId: chatInfo.chatRoomId,
					});
				}

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

			// socket.onAny((event, ...args) => {
			// 	console.log("Got event:", event, args);
			// });

			// receive messages
			socket.on("new customer message", (data) => {
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

	const fetchMessages = async () => {
		if (chatInfo.chatRoomId) {
			try {
				let res = await chatService.listChatMessages({
					cursor: 0,
					take: 20,
					desc: true,
					chatRoomId: Number(chatInfo.chatRoomId),
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
			socketRef.current.emit("new message", {
				message: chatMsg.text,
				messageType: "text",
				media: [],
				senderId: user.userId,
				chatRoomId: chatInfo.chatRoomId,
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
			socketRef.current.emit("new message", {
				message: chatInfo.text || "Consultation Request",
				messageType: "video",
				media: [
					{
						thumbnail: chatInfo.thumbnail,
						url: chatInfo.video,
					},
				],
				senderId: user.userId,
			});
		}
	};

	const renderSend = (props: any) => {
		return (
			<Send {...props} containerStyle={styles.sendContainer}>
				<View style={styles.sendBtn}>
					<Ionicons name="send" size={20} color="#fff" />
				</View>
			</Send>
		);
	};

	const renderInputToolbar = (props: any) => (
		<InputToolbar
			{...props}
			containerStyle={styles.toolbarContainer}
			primaryStyle={{
				alignItems: "center",
			}}
		/>
	);

	const renderComposer = (props: any) => {
		return (
			<View style={styles.composerWrapper}>
				<Composer
					{...props}
					textInputStyle={styles.customComposer}
					placeholder="Type a message..."
				/>
				<TouchableOpacity onPress={() => console.log("File Upload")}>
					<MaterialIcons name="attach-file" size={24} color="#555" />
				</TouchableOpacity>
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
								color: "#fff", // sender text color
							},
							left: {
								color: "#000", // receiver text color
							},
						}}
					/>
				)}
				keyboardShouldPersistTaps="handled"
				bottomOffset={Platform.OS === "ios" ? 30 : 0}
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
		width: "80%",
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
