import { apiRequest } from "@/utils/axiosInstance";

const getDiscount = async () => {
	const { data } = await apiRequest().get(`/discount-amount`);
	return data?.data;
};

const getProStats = async (id: string) => {
	const { data } = await apiRequest().get(`/pros/${id}`);
	return data?.data;
};

const getProTarget = async () => {
	const { data } = await apiRequest().get(`/task-target`);
	return data?.data;
};

const getReviews = async (id: any) => {
	const { data } = await apiRequest().post(`/pros/${id}/reviews`, {});
	return data?.data;
};

const getBraidersAvailability = async (date: any, id: string) => {
	const { data } = await apiRequest().get(`/consultant/available/pros`);
	return data?.data;
};

const basicService = {
	getDiscount,
	getProStats,
	getProTarget,
	getReviews,
	getBraidersAvailability,
};

export default basicService;
