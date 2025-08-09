import { apiRequest } from "@/utils/axiosInstance";

const getDiscount = async () => {
	const { data } = await apiRequest().get(`/discount-amount`);
	return data?.data;
};

const basicService = {
	getDiscount,
};

export default basicService;
