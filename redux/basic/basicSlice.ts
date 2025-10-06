// socketSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookService from "../book/bookService";
import basicService from "./basicService";

const initialState = {
	notiList: [],
	transportFee: 0,
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

export const getTransport = createAsyncThunk("basic/transport", async () => {
	try {
		let res = await bookService.transportInfo();
		if (res?.price) {
			return res.price / 100;
		} else {
			return 0;
		}
	} catch (error: any) {}
});

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
		builder.addCase(getTransport.fulfilled, (state, action) => {
			state.transportFee = action.payload || 0;
		});
	},
});

export const { clearNoti } = basicSlice.actions;

export default basicSlice.reducer;
