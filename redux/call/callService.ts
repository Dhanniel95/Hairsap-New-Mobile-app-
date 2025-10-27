import { apiRequest } from "@/utils/axiosInstance";

const generateToken = async (id: number) => {
	const { data } = await apiRequest(true).get(`/call/generate-token`);
	return data;
};

const callService = {
	generateToken,
};

export default callService;
