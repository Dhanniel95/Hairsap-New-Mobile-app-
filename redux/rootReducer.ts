import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import basicSlice from "./basic/basicSlice";
import bookSlice from "./book/bookSlice";
import chatSlice from "./chat/chatSlice";

const rootReducer = combineReducers({
	auth: authSlice,
	chat: chatSlice,
	basic: basicSlice,
	book: bookSlice,
});

export default rootReducer;
