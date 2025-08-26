import chatService from "@/redux/chat/chatService";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const ChatScreen = () => {
	useEffect(() => {
		listChats();
	}, []);

	const listChats = async () => {
		try {
			let res = await chatService.listChatRooms();
			console.log(res);
		} catch (err) {}
	};

	return (
		<View>
			<Text>ChatScreen</Text>
		</View>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({});
