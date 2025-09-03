// socketSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import basicService from "./basicService";

const initialState = {
	notiList: [],
};

export const listNotifications = createAsyncThunk(
	"basic/notifications",
	async () => {
		try {
			let res = await basicService.listNotifications();
			return res?.data;
		} catch (error: any) {}
	}
);

const basicSlice = createSlice({
	name: "basic",
	initialState,
	reducers: {
		clearNoti: (state) => {
			state.notiList = [];
		},
	},
	extraReducers(builder) {
		builder.addCase(listNotifications.fulfilled, (state, action) => {
			state.notiList = action.payload;
		});
	},
});

export const { clearNoti } = basicSlice.actions;

export default basicSlice.reducer;
