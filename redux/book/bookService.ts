import { apiRequest } from "@/utils/axiosInstance";

const listServices = async () => {
	const { data } = await apiRequest().get(`/gallery`);
	return data;
};

const listTransactionHistory = async () => {
	const { data } = await apiRequest().get(`/bookings/transactions`);
	return data.data;
};

const bookService = {
	listServices,
	listTransactionHistory,
};

export default bookService;
