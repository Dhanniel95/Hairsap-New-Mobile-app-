import { displayError } from "@/utils/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userDetailsType } from "../../utils/types";
import authService from "./authService";

const initialState = {
	loading: false,
	user: userDetailsType,
};

export const loginUser = createAsyncThunk(
	"auth/login",
	async (data: any, thunkAPI) => {
		try {
			let res = await authService.login(data);
			if (res?.token) {
				await AsyncStorage.setItem("@accesstoken", res.token);
			}
			return res?.user || res?.consultant;
		} catch (error: any) {
			let message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const loginGuest = createAsyncThunk(
	"auth/guest",
	async (data: any, thunkAPI) => {
		try {
			let res = await authService.registerGuest(data);
			if (res?.token) {
				await AsyncStorage.setItem("@accesstoken", res.token);
			}
			console.log(res, "RES");
			return res?.guest;
		} catch (error: any) {
			let message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const saveUserData = createAsyncThunk(
	"auth/userData",
	async (data: any, thunkAPI) => {
		try {
			return data;
		} catch (error: any) {
			let message = displayError(error, false);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getUserInfo = createAsyncThunk(
	"auth/userInfo",
	async (_, thunkAPI: any) => {
		try {
			const { user } = thunkAPI.getState()?.auth;
			let res;
			if (user?.role === "consultant") {
				res = await authService.fetchConsultantProfile();
			} else if (user?.role === "pro") {
				res = await authService.fetchBraiderProfile();
			} else {
				res = await authService.fetchProfile();
			}
			return res?.data;
		} catch (error: any) {
			let message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logOut: (state) => {
			state.loading = false;
			state.user = {};
		},
		resetLoad: (state) => {
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.loading = false;
			if (action.payload?.userId) {
				state.user = action.payload;
			}
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.loading = false;
		});
		builder.addCase(loginGuest.fulfilled, (state, action) => {
			state.loading = false;
			if (action.payload?.userId) {
				state.user = action.payload;
			}
		});
		builder.addCase(saveUserData.fulfilled, (state, action) => {
			state.loading = false;
			if (action.payload?.userId) {
				state.user = action.payload;
			}
		});
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			if (action.payload?.userId) {
				state.user = action.payload;
			}
		});
	},
});

export const { logOut, resetLoad } = authSlice.actions;

export default authSlice.reducer;
