import { apiRequest } from "@/utils/axiosInstance";

const listChatRooms = async () => {
	const { data } = await apiRequest().get(`/chats/chatrooms`);
	return data;
};

const listChatMessages = async () => {
	const { data } = await apiRequest().post(`/chats/chatrooms/messages`);
	return data;
};

const listCustomersChats = async () => {
	const { data } = await apiRequest().get(`/chats/chatroom/customers`);
	return data;
};

const listGuestChats = async () => {
	const { data } = await apiRequest().get(`/chats/chatroom/guests`);
	return data;
};

const listMyCustomersChats = async () => {
	const { data } = await apiRequest().get(`/chats/chatroom/me/customers`);
	return data;
};

const listMyGuestChats = async () => {
	const { data } = await apiRequest().get(`/chats/chatroom/me/guests`);
	return data;
};

const chatService = {
	listChatRooms,
	listChatMessages,
	listCustomersChats,
	listGuestChats,
	listMyCustomersChats,
	listMyGuestChats,
};

export default chatService;
