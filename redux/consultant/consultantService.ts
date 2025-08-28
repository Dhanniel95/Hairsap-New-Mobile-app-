import { apiRequest } from "@/utils/axiosInstance";

const profileDetails = async (id: any) => {
	const { data } = await apiRequest().get(`/consultant/${id}/metrics`);
	return data;
};

const consultantService = {
	profileDetails,
};

export default consultantService;
