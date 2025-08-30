import { apiRequest } from "@/utils/axiosInstance";

const listChatRooms = async () => {
	const { data } = await apiRequest().get(`/chats/chatrooms`);
	return data;
};

const listChatMessages = async (obj: any) => {
	const { data } = await apiRequest().post(`/chats/chatroom/messages`, obj);
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

const listBraidersChats = async () => {
	const { data } = await apiRequest().get(`/chats/chatroom/me/pros`);
	return data;
};

const uploadImage = async (obj: any) => {
	const { data } = await apiRequest(true).post(`/chats/photo`, obj);
	return data;
};

const uploadVideo = async (obj: any) => {
	const { data } = await apiRequest(true).post(`/chats/video`, obj);
	return data;
};

const uploadAudio = async (obj: any) => {
	const { data } = await apiRequest(true).post(`/chats/audio`, obj);
	return data;
};

const markAsRead = async (id: string) => {
	const { data } = await apiRequest(true).post(`/chats/${id}/read`, {});
	return data;
};

const chatService = {
	listChatRooms,
	listChatMessages,
	listCustomersChats,
	listGuestChats,
	listMyCustomersChats,
	listMyGuestChats,
	listBraidersChats,
	uploadAudio,
	uploadImage,
	uploadVideo,
	markAsRead,
};

export default chatService;
