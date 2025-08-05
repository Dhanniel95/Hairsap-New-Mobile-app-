import axios from "axios";
import baseUrl from "./config";

const apiRequest = (file?: boolean) => {
	const axiosInstance = axios.create({
		baseURL: baseUrl,
	});

	axiosInstance.interceptors.request.use(
		async (config) => {
			const accessToken =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6bnVsbCwicm9sZSI6InVzZXIiLCJ1c2VySWQiOjIzMzUsImlhdCI6MTc1NDQyMTkyOH0.MkmUe6q9vNK1T6xZAs2xbHItebEMfx1vVyKJTNlt_GE";
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
