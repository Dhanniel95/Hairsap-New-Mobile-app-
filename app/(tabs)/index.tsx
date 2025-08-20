import ChatRooms from "@/components/Consultant/ChatRooms";
import Header from "@/components/Header";
import Gallery from "@/components/User/Gallery";
import { useAppSelector } from "@/utils/hooks";
import React from "react";
import { View } from "react-native";

const HomeTab = () => {
	const { user } = useAppSelector((state) => state.auth);

	return (
		<View style={{ flex: 1, backgroundColor: "#FFF" }}>
			<Header />
			{user.role === "consultant" ? <ChatRooms /> : <Gallery />}
		</View>
	);
};

export default HomeTab;
