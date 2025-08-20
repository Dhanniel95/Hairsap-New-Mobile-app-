import ChatHeader from "@/components/Chat/ChatHeader";
import MainChat from "@/components/Chat/MainChat";
import chatService from "@/redux/chat/chatService";
import { useAppSelector } from "@/utils/hooks";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

const MessagesScreen = () => {
	const [chatInfo, setChatInfo] = useState({});

	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (user.role === "user") {
			listChatRooms();
		}
	}, []);

	const listChatRooms = async () => {
		try {
			let res = await chatService.listChatRooms();
			setChatInfo({ chatRoomId: 3 });
		} catch (err) {}
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#FFF" }}>
			<ChatHeader headerInfo={{ user: "Consultant" }} />
			<MainChat chatInfo={{ chatRoomId: 3 }} />
		</View>
	);
};

export default MessagesScreen;
