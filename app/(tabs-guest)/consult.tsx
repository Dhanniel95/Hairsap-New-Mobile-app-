import Consult from "@/components/User/Consult";
import chatService from "@/redux/chat/chatService";
import { consultantChatting, saveChatId } from "@/redux/chat/chatSlice";
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
			if (
				Array.isArray(res?.data?.chatRooms) &&
				res?.data?.chatRooms?.length > 0
			) {
				let id = res.data.chatRooms[0].chatRoomId;
				let receiver = res.data.chatRooms[0]?.chat?.receiver;
				dispatch(saveChatId(id));
				dispatch(consultantChatting(receiver));
			}
		} catch (err) {
			console.log(err);
		}
	};

	return <Consult />;
};

export default ConsultScreen;
