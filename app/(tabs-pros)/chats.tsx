import EachChat from "@/components/List/EachChat";
import chatService from "@/redux/chat/chatService";
import { setSocketStatus } from "@/redux/socket/socketSlice";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import baseUrl from "@/utils/config";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { connectSocket, disconnectSocket } from "@/utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

const ChatScreen = () => {
	const dispatch = useAppDispatch();

	const { user } = useAppSelector((state) => state.auth);

	const [list, setList] = useState<any>([]);
	const [refreshing, setRefreshing] = useState(false);

	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			listChats();
		}
	}, [isFocused]);

	useEffect(() => {
		connectToSocket();

		return () => {
			disconnectSocket();
		};
	}, []);

	const listChats = async () => {
		try {
			let res = await chatService.listChatRooms();
			if (Array.isArray(res?.data)) {
				setList(res.data);
			}
		} catch (err) {}
	};

	const connectToSocket = async () => {
		const token = (await AsyncStorage.getItem("@accesstoken")) || "";

		const socket = connectSocket(baseUrl, token, user.role);

		socket.on("connect", () => {
			console.log("Connected");
			dispatch(setSocketStatus("connected"));
		});

		socket.on("disconnect", () => {
			console.log("Disconnected");
			dispatch(setSocketStatus("disconnected"));
		});

		socket.on("connect_error", (err) => {
			console.log("Error With Connection", err);
			dispatch(setSocketStatus("disconnected"));
		});
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
