import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import basicSlice from "./basic/basicSlice";
import chatSlice from "./chat/chatSlice";

const rootReducer = combineReducers({
	auth: authSlice,
	chat: chatSlice,
	basic: basicSlice,
});

export default rootReducer;
