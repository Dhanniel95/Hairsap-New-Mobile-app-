import Consult from "@/components/User/Consult";
import chatService from "@/redux/chat/chatService";
import { saveChatId } from "@/redux/chat/chatSlice";
import { useAppDispatch } from "@/utils/hooks";
import React, { useEffect } from "react";

const ConsultScreen = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		loadRooms();
	}, []);

	const loadRooms = async () => {
		try {
			let res = await chatService.listChatRooms();
			console.log(res, "RES");
			if (Array.isArray(res?.data) && res?.data?.length > 0) {
				let id = res.data[0].chatRoomId;
				dispatch(saveChatId(id));
			}
		} catch (err) {
			console.log(err);
		}
	};

	return <Consult />;
};

export default ConsultScreen;
