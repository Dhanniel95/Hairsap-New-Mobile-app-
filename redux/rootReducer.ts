import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";

const rootReducer = combineReducers({
	auth: authSlice,
});

export default rootReducer;
