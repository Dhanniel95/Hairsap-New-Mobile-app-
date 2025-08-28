import { useAppSelector } from "@/utils/hooks";
import React from "react";
import { View } from "react-native";
import ChatHeader from "../Chat/ChatHeader";
import MainChat from "../Chat/MainChat";

const Consult = () => {
	const { userChatRoomId } = useAppSelector((state) => state.chat);

	console.log(userChatRoomId, "id");

	return (
		<View style={{ flex: 1, backgroundColor: "#FFF" }}>
			<ChatHeader headerInfo={{ user: "Consultant" }} />
			<MainChat chatInfo={{ chatRoomId: userChatRoomId }} />
		</View>
	);
};

export default Consult;
