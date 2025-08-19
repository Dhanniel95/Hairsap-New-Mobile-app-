import chatService from "@/redux/chat/chatService";
import colors from "@/utils/colors";
import { useAppSelector } from "@/utils/hooks";
import { createSocket } from "@/utils/socket";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
	Composer,
	GiftedChat,
	IMessage,
	InputToolbar,
	Send,
} from "react-native-gifted-chat";
import GalleryCheck from "./GalleryCheck";

const MainChat = ({ chatInfo }: { chatInfo?: any }) => {
	const [messages, setMessages] = useState<IMessage[]>([]);

	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		connectToSocket();
	}, []);

	useEffect(() => {
		fetchMessages();
	}, []);

	useEffect(() => {
		if (chatInfo?.video) {
			consultHandler();
		}
	}, [chatInfo]);

	const connectToSocket = async () => {
		let token = (await AsyncStorage.getItem("@accesstoken")) || "";
		const socket = createSocket(user.role, token);

		socket.connect();

		socket.on("connect", () => {
			console.log("Connected");
		});

		socket.on("disconnect", () => {
			console.log("Disconnected");
		});

		socket.on("connect_error", (err) => {
			console.log("Error With Connection", err);
		});
	};

	const fetchMessages = async () => {
		try {
			let res = await chatService.listChatRooms();
			console.log(res, "RES");
		} catch (err) {}
	};

	const onSend = useCallback((newMessages: IMessage[] = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, newMessages)
		);
	}, []);

	const consultHandler = () => {
		let payload = {
			_id: 1,
			text: "Hello! Welcome to the chat.",
			createdAt: new Date(),
			user: {
				_id: 2,
				name: "Chat Bot",
				avatar: "https://i.pravatar.cc/300",
			},
			video: chatInfo.video,
		};
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, [payload])
		);
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

	return (
		<View style={{ flex: 1 }}>
			<GiftedChat
				messages={messages}
				onSend={onSend}
				user={{
					_id: 1, // current logged-in user id
					name: "John Doe",
					avatar: "https://i.pravatar.cc/300",
				}}
				showUserAvatar
				alwaysShowSend
				scrollToBottom
				inverted={messages.length > 0 ? true : false}
				listViewProps={{
					contentContainerStyle: {
						paddingHorizontal: 20,
					},
					ListEmptyComponent: () => <GalleryCheck />,
				}}
				renderSend={renderSend}
				renderComposer={renderComposer}
				renderInputToolbar={renderInputToolbar}
			/>
		</View>
	);
};

export default MainChat;

const styles = StyleSheet.create({
	toolbarContainer: {
		paddingLeft: 20,
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 20,
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
