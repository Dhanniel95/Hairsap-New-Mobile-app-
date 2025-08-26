// socketSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	userChatRoomId: "",
};

export const saveChatId = createAsyncThunk(
	"chat/roomId",
	async (id: string) => {
		try {
			return id;
		} catch (error: any) {
			return "";
		}
	}
);

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(saveChatId.fulfilled, (state, action) => {
			state.userChatRoomId = action.payload;
		});
	},
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
