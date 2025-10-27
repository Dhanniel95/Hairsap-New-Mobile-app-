import { createSlice } from "@reduxjs/toolkit";

interface CallState {
	callId: string | null;
	activated: boolean;
	callType: "incoming" | "outgoing" | "active" | null;
}

const initialState: CallState = {
	callId: null,
	activated: false,
	callType: null,
};

const callSlice = createSlice({
	name: "call",
	initialState,
	reducers: {
		setActiveCall: (state, action) => {
			state.callId = action.payload.callId;
			state.callType = action.payload.type;
		},
		setCallType: (state, action) => {
			state.callType = action.payload;
		},
		resetCall: (state) => {
			state.callId = null;
			state.callType = null;
		},
	},
});

export const { setActiveCall, setCallType, resetCall } = callSlice.actions;

export default callSlice.reducer;
