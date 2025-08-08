import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "./config";

const apiRequest = (file?: boolean) => {
	const axiosInstance = axios.create({
		baseURL: baseUrl,
	});

	axiosInstance.interceptors.request.use(
		async (config) => {
			const accessToken = await AsyncStorage.getItem("@accesstoken");
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			config.headers["Content-Type"] = file
				? "multipart/form-data"
				: "application/json";
			config.headers["Accept"] = "application/json";
			return config;
		},
		(error) => Promise.reject(error)
	);
	return axiosInstance;
};

export { apiRequest };
