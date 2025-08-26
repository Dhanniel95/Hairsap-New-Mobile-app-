import EachChat from "@/components/List/EachChat";
import chatService from "@/redux/chat/chatService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

const ChatScreen = () => {
	const [list, setList] = useState<any>([]);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		listChats();
	}, []);

	const listChats = async () => {
		try {
			let res = await chatService.listChatRooms();
			if (Array.isArray(res?.data)) {
				setList(res.data);
			}
		} catch (err) {}
	};

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		listChats();
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#FFF",
				paddingHorizontal: 20,
				paddingVertical: 15,
			}}
		>
			<Text
				style={[
					textStyles.textBold,
					{ textAlign: "center", paddingVertical: 10, fontSize: 17 },
				]}
			>
				Chats
			</Text>
			<View style={{ flex: 1 }}>
				<FlatList
					data={list}
					keyExtractor={(item: any) => item.chat?.chatId?.toString()}
					renderItem={({ item }) => <EachChat chat={item} />}
					contentContainerStyle={{ paddingBottom: 100 }}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor={colors.dark}
							colors={[colors.dark]}
						/>
					}
					ListEmptyComponent={
						<View style={{ marginTop: 100 }}>
							<Text
								style={[
									textStyles.text,
									{ textAlign: "center", fontSize: 13 },
								]}
							>
								Your Chats will appear here..
							</Text>
						</View>
					}
				/>
			</View>
		</View>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({});
