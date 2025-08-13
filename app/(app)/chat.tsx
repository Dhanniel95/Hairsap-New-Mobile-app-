import ChatHeader from "@/components/Chat/ChatHeader";
import MainChat from "@/components/Chat/MainChat";
import Container from "@/components/Container";
import React from "react";

const ChatScreen = () => {
	return (
		<Container dark={true} bg="#FFF">
			<ChatHeader />
			<MainChat />
		</Container>
	);
};

export default ChatScreen;
