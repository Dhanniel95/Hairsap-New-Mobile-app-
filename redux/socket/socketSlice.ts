// socketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const socketIoSlice = createSlice({
	name: "socket",
	initialState: {
		status: "",
	},
	reducers: {
		setSocketStatus(state, action) {
			state.status = action.payload;
		},
		clearSocket(state) {
			state.status = "disconnected";
		},
	},
});

export const { setSocketStatus, clearSocket } = socketIoSlice.actions;

export default socketIoSlice.reducer;
