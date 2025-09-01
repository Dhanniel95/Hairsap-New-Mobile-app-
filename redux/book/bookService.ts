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

const listBookings = async () => {
	const { data } = await apiRequest().get(`/bookings/accepted`);
	return data;
};

const serviceList = async () => {
	const { data } = await apiRequest().get(`/services`);
	return data;
};

const createBooking = async (obj: any) => {
	const { data } = await apiRequest().post(`/consultant/service/book`, obj);
	return data;
};

const loadBookingData = async (id: string) => {
	const { data } = await apiRequest().get(`/bookings/${id}`);
	return data?.data;
};

const bookingArrival = async (id: string) => {
	const { data } = await apiRequest().post(`/bookings/${id}/arrived`, {});
	return data?.data;
};

const completeBooking = async (id: string) => {
	const { data } = await apiRequest().post(`/bookings/${id}/completed`, {});
	return data?.data;
};

const cancelBooking = async (id: string) => {
	const { data } = await apiRequest().patch(`/bookings/${id}/pin/cancel`, {});
	return data?.data;
};

const transportInfo = async () => {
	const { data } = await apiRequest().get(`/transport`);
	return data?.data;
};

const bookService = {
	listServices,
	listTransactionHistory,
	fetchMessages,
	listBookings,
	serviceList,
	createBooking,
	loadBookingData,
	bookingArrival,
	completeBooking,
	cancelBooking,
	transportInfo,
};

export default bookService;
