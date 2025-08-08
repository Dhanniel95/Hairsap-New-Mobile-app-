import { apiRequest } from "@/utils/axiosInstance";

const listServices = async () => {
	const { data } = await apiRequest().get(`/gallery`);
	return data;
};

const bookService = {
	listServices,
};

export default bookService;
