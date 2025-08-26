import { apiRequest } from "@/utils/axiosInstance";

const getDiscount = async () => {
	const { data } = await apiRequest().get(`/discount-amount`);
	return data?.data;
};

const getProStats = async (id: string) => {
	const { data } = await apiRequest().get(`/pros/${id}`);
	return data?.data;
};

const basicService = {
	getDiscount,
	getProStats,
};

export default basicService;
