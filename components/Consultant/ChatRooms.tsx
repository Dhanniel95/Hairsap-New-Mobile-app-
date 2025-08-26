import chatService from "@/redux/chat/chatService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import Tab from "../Basics/Tab";
import EachChat from "../List/EachChat";

const ChatRooms = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [guestList, setGuestList] = useState<any>([]);
	const [myGuestList, setMyGuestList] = useState<any>([]);
	const [myCustomersList, setMyCustomersList] = useState<any>([]);
	const [customersList, setCustomersList] = useState<any>([]);
	const [braidersList, setBraidersList] = useState<any>([]);
	const [refreshing, setRefreshing] = useState<any>(false);

	useEffect(() => {
		listChats();
	}, []);

	const listChats = async () => {
		listGuests();
		listCustomers();
		listMyGuests();
		listMyCustomers();
		listBraiders();
	};

	const listMyGuests = async () => {
		try {
			let res = await chatService.listMyGuestChats();
			if (Array.isArray(res?.data)) {
				setMyGuestList(res.data);
			}
		} catch (err) {}
	};

	const listGuests = async () => {
		try {
			let res = await chatService.listGuestChats();
			if (Array.isArray(res?.data)) {
				setGuestList(res.data);
			}
		} catch (err) {}
	};

	const listCustomers = async () => {
		try {
			let res = await chatService.listCustomersChats();
			if (Array.isArray(res?.data)) {
				setCustomersList(res.data);
			}
		} catch (err) {}
	};

	const listMyCustomers = async () => {
		try {
			let res = await chatService.listMyCustomersChats();
			if (Array.isArray(res?.data)) {
				setMyCustomersList(res.data);
			}
		} catch (err) {}
	};

	const listBraiders = async () => {
		try {
			setBraidersList([]);
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
							sub: guestList.length,
						},
						{
							id: 2,
							name: "All Customers",
							sub: customersList.length,
						},
						{
							id: 3,
							name: "My Guests",
							sub: myGuestList.length,
						},
						{
							id: 4,
							name: "My Customers",
							sub: myCustomersList.length,
						},
						{
							id: 5,
							name: "Braiders",
							sub: braidersList.length,
						},
					]}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</View>
			<View style={{ flex: 1 }}>
				<FlatList
					data={
						activeTab === 1
							? guestList
							: activeTab === 2
							? customersList
							: activeTab === 3
							? myGuestList
							: activeTab === 4
							? myCustomersList
							: braidersList
					}
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
				/>
			</View>
		</View>
	);
};

export default ChatRooms;

const styles = StyleSheet.create({
	btn: {},
});
