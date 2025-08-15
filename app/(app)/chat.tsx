import ChatHeader from "@/components/Chat/ChatHeader";
import MainChat from "@/components/Chat/MainChat";
import Container from "@/components/Container";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const ChatScreen = () => {
	const params = useLocalSearchParams();

	return (
		<Container dark={true} bg="#FFF">
			<ChatHeader />
			<MainChat chatInfo={params} />
		</Container>
	);
};

export default ChatScreen;
