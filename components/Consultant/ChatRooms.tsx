import chatService from "@/redux/chat/chatService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { displayError } from "@/utils/error";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import Tab from "../Basics/Tab";
import EachChat from "../List/EachChat";

const ChatRooms = () => {
	const [load, setLoad] = useState(false);
	const [activeTab, setActiveTab] = useState(1);
	const [list, setList] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		listChats();
	}, [activeTab]);

	const listChats = async () => {
		try {
			setLoad(true);
			let res;
			if (activeTab === 1) {
				res = await chatService.listGuestChats();
			} else if (activeTab === 2) {
				res = await chatService.listCustomersChats();
			} else if (activeTab === 3) {
				res = await chatService.listMyGuestChats();
			} else if (activeTab === 4) {
				res = await chatService.listMyCustomersChats();
			} else {
				res = [];
			}
			setLoad(false);
			if (Array.isArray(res?.data)) {
				setList(res.data);
			}
		} catch (err) {
			setLoad(false);
			console.log(displayError(err, false));
		}
	};

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		listChats();
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 15 }}>
			<Text style={[textStyles.textBold, { fontSize: 17 }]}>
				Consultations
			</Text>
			<View style={{ marginVertical: 15 }}>
				<Tab
					tabs={[
						{
							id: 1,
							name: "All Guests",
							sub: activeTab === 1 ? list.length : null,
						},
						{
							id: 2,
							name: "All Customers",
							sub: activeTab === 2 ? list.length : null,
						},
						{
							id: 3,
							name: "My Guests",
							sub: activeTab === 3 ? list.length : null,
						},
						{
							id: 4,
							name: "My Customers",
							sub: activeTab === 4 ? list.length : null,
						},
						{
							id: 5,
							name: "Braiders",
							sub: activeTab === 5 ? list.length : null,
						},
					]}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</View>
			<View style={{ flex: 1 }}>
				<FlatList
					data={list}
					keyExtractor={(item: any) =>
						Array.isArray(item.chat)
							? item.chat[0].chatId?.toString()
							: item.chat?.chatId?.toString()
					}
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
				/>
			</View>
		</View>
	);
};

export default ChatRooms;

const styles = StyleSheet.create({
	btn: {},
});
