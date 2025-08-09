import { apiRequest } from "@/utils/axiosInstance";

const login = async (obj: any) => {
	const { data } = await apiRequest().post(`/auth/login`, obj);
	return data?.data;
};

const register = async (obj: any) => {
	const { data } = await apiRequest().post(`/auth/signup`, obj);
	return data;
};

const uploadFaceId = async (obj: any) => {
	const { data } = await apiRequest(true).post(`/users/faceid`, obj);
	return data;
};

const forgotPassword = async (obj: any) => {
	const { data } = await apiRequest().post(`/auth/resetpassword`, obj);
	return data;
};

const resetPassword = async (obj: any) => {
	const { data } = await apiRequest().post(`/auth/confirmresetpassword`, obj);
	return data;
};

const fetchProfile = async () => {
	const { data } = await apiRequest().get(`/users/me`);
	return data;
};

const editProfile = async (obj: any) => {
	const { data } = await apiRequest().patch(`/users`, obj);
	return data;
};

const authService = {
	login,
	register,
	uploadFaceId,
	forgotPassword,
	resetPassword,
	fetchProfile,
	editProfile,
};

export default authService;
