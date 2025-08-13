import { apiRequest } from "@/utils/axiosInstance";

const listServices = async () => {
	const { data } = await apiRequest().get(`/gallery`);
	return data;
};

const listTransactionHistory = async () => {
	const { data } = await apiRequest().get(`/bookings/transactions`);
	return data.data;
};

const fetchMessages = async (id: any, limit: number) => {
	const { data } = await apiRequest().post(`/chats`, {
		userId: id,
		take: limit,
	});
	return data.data;
};

const bookService = {
	listServices,
	listTransactionHistory,
	fetchMessages,
};

export default bookService;
