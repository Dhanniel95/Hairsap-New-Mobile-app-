import { apiRequest } from "@/utils/axiosInstance";

const listChatRooms = async () => {
	const { data } = await apiRequest().get(`/chats/chatrooms`);
	return data;
};

const listChatMessages = async () => {
	const { data } = await apiRequest().post(`/chats/chatrooms/messages`);
	return data;
};

const chatService = {
	listChatRooms,
	listChatMessages,
};

export default chatService;
