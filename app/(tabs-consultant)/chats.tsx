import ChatTabs from "@/components/Consultant/ChatTabs";
import Header from "@/components/Header";
import EachChat from "@/components/List/EachChat";
import ModalComponent from "@/components/ModalComponent";
import UserForm from "@/components/User/UserForm";
import { listNotifications } from "@/redux/basic/basicSlice";
import chatService from "@/redux/chat/chatService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { displaySuccess } from "@/utils/error";
import { useAppDispatch } from "@/utils/hooks";
import { useDebounce } from "@/utils/search";
import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
	FlatList,
	RefreshControl,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const ChatRooms = () => {
	const dispatch = useAppDispatch();

	const isFocused = useIsFocused();

	const [activeTab, setActiveTab] = useState(1);
	const [load, setLoad] = useState(false);
	const [guestList, setGuestList] = useState<any>({});
	const [myGuestList, setMyGuestList] = useState<any>({});
	const [myCustomersList, setMyCustomersList] = useState<any>({});
	const [customersList, setCustomersList] = useState<any>({});
	const [braidersList, setBraidersList] = useState<any>({});
	const [refreshing, setRefreshing] = useState<any>(false);
	const [openModal, setOpenModal] = useState(false);
	const [search, setSearch] = useState("");
	const [searchList, setSearchList] = useState<any>([]);

	const debouncedSearch = useDebounce(search);

	useEffect(() => {
		if (isFocused) {
			listChats();
		}
	}, [isFocused]);

	useEffect(() => {
		dispatch(listNotifications());
	}, []);

	useEffect(() => {
		if (debouncedSearch) {
			filterSearch(debouncedSearch);
		}
	}, [debouncedSearch]);

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
			if (Array.isArray(res?.data?.data)) {
				setMyGuestList(res.data);
			}
		} catch (err) {}
	};

	const listGuests = async () => {
		try {
			setLoad(true);
			let res = await chatService.listGuestChats();
			if (Array.isArray(res?.data?.chatRooms)) {
				setGuestList(res.data);
			}
			setLoad(false);
		} catch (err) {
			setLoad(false);
		}
	};

	const listCustomers = async () => {
		try {
			let res = await chatService.listCustomersChats();
			if (Array.isArray(res?.data?.chatRooms)) {
				setCustomersList(res.data);
			}
		} catch (err) {}
	};

	const listMyCustomers = async () => {
		try {
			let res = await chatService.listMyCustomersChats();
			if (Array.isArray(res?.data?.chatRooms)) {
				setMyCustomersList(res.data);
			}
		} catch (err) {}
	};

	const listBraiders = async () => {
		try {
			let res = await chatService.listBraidersChats();
			if (Array.isArray(res?.data?.chatRooms)) {
				setBraidersList(res.data);
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

	const filterSearch = (val: string) => {
		const lowerQuery = val.toLowerCase();

		setSearchList(
			customersList.chatRooms?.filter(
				(user: any) =>
					user?.name?.toLowerCase().includes(lowerQuery) ||
					user?.phone?.includes(lowerQuery)
			)
		);
	};

	const arrayType = (type: string) => {
		if (activeTab === 1) {
			return guestList[type];
		} else if (activeTab === 2) {
			if (search) {
				return searchList;
			} else {
				return customersList[type];
			}
		} else if (activeTab === 3) {
			return myGuestList?.data;
		} else if (activeTab === 4) {
			return myCustomersList[type];
		} else {
			return braidersList[type];
		}
	};

	const keyId = (item: any) => {
		if (item.chatRoomId) {
			return item.chatRoomId.toString();
		} else if (item.userId) {
			return item.userId.toString();
		} else {
			return item.chat?.chatId?.toString();
		}
	};

	return (
		<View
			style={{
				flex: 1,

				backgroundColor: "#FFF",
			}}
		>
			<Header />
			<View
				style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 15 }}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 10,
					}}
				>
					<Text style={[textStyles.textBold, { fontSize: 18 }]}>
						Consultations
					</Text>
					<TouchableOpacity
						onPress={() => setOpenModal(true)}
						style={{
							backgroundColor: colors.secondary,
							paddingHorizontal: 15,
							paddingVertical: 10,
							borderRadius: 4,
						}}
					>
						<Text
							style={[
								textStyles.textMid,
								{ color: "#FFF", fontSize: 14 },
							]}
						>
							New User
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ marginBottom: 20, marginTop: 15 }}>
					<ChatTabs
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						guestList={guestList.cursor?.totalUnreadMessage}
						braidersList={braidersList.cursor?.totalUnreadMessage}
						customersList={customersList.cursor?.totalUnreadMessage}
						myCustomersList={
							myCustomersList.cursor?.totalUnreadMessage
						}
						myGuestList={myGuestList.cursor?.totalUnreadMessage}
					/>
				</View>
				{activeTab === 2 && (
					<View style={{ position: "relative", marginBottom: 10 }}>
						<TextInput
							value={search}
							onChangeText={setSearch}
							placeholder="Search"
							style={styles.input}
							placeholderTextColor={"rgba(0,0,0,0.3)"}
						/>
						<Feather
							name="search"
							color={"rgba(0,0,0,0.3)"}
							size={20}
							style={styles.pos}
						/>
					</View>
				)}
				<View style={{ flex: 1 }}>
					<FlatList
						data={arrayType("chatRooms")}
						keyExtractor={(item: any, i: number) => i.toString()}
						renderItem={({ item }) => (
							<EachChat
								chat={item}
								userType={
									activeTab === 1 || activeTab === 3
										? "guest"
										: activeTab === 2 || activeTab === 4
										? "user"
										: "pro"
								}
							/>
						)}
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
			<ModalComponent
				open={openModal}
				closeModal={() => setOpenModal(false)}
				centered
				bg="#334155"
				onlyCancel={true}
			>
				<UserForm
					onSubmit={() => {
						displaySuccess(
							"Congrats!",
							"The User has been Created. Password will be the name in CAPS without spaces."
						);
						setOpenModal(false);
					}}
					userId=""
				/>
			</ModalComponent>
		</View>
	);
};

export default ChatRooms;

const styles = StyleSheet.create({
	input: {
		width: "100%",
		borderColor: "rgba(0,0,0,0.3)",
		borderWidth: 1,
		height: 50,
		paddingLeft: 35,
		borderRadius: 20,
		fontFamily: "regular",
		color: "rgba(0,0,0,0.3)",
	},
	pos: {
		position: "absolute",
		top: 14,
		left: 10,
	},
});
