// socketSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookService from "./bookService";

const initialState = {
	videos: [] as any,
};

export const listGallery = createAsyncThunk("book/gallery", async () => {
	try {
		let res = await bookService.listServices();
		if (Array.isArray(res?.data) && res?.data?.length > 0) {
			let arr = res.data.sort((a: any, b: any) => {
				const dateA = new Date(a.createdAt).getTime();
				const dateB = new Date(b.createdAt).getTime();
				return dateB - dateA;
			});
			return arr;
		} else {
			return [];
		}
	} catch (error: any) {
		return "";
	}
});

const bookSlice = createSlice({
	name: "book",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(listGallery.fulfilled, (state, action) => {
			state.videos = action.payload;
		});
	},
});

export const {} = bookSlice.actions;

export default bookSlice.reducer;
