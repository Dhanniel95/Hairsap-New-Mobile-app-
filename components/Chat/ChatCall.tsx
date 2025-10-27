import { setActiveCall } from "@/redux/call/callSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { getStreamClient } from "@/utils/stream";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";

const ChatCall = ({
	userId,
	username,
}: {
	userId: number;
	username: string;
}) => {
	const dispatch = useAppDispatch();

	const router = useRouter();

	const { user } = useAppSelector((state) => state.auth);

	const [load, setLoad] = useState(false);

	const handleCallUser = async () => {
		const client = getStreamClient();

		if (!client) return;

		try {
			setLoad(true);
			const callId = `call_${Date.now()}`;
			const call = client.call("default", callId);

			await call.getOrCreate({
				data: {
					members: [
						{ user_id: `${user.userId}` },
						{ user_id: `${userId}` },
					],
				},
				ring: true,
			});

			await call.camera.disable();

			await call.join({ video: false });

			dispatch(setActiveCall({ callId: call.id, type: "outgoing" }));
			router.push("/(app)/call");
			setLoad(false);
		} catch (error: any) {
			setLoad(false);
			let code = error.code;
			let msg = error.message;
			Alert.alert(
				"Error",
				code == 4
					? `User you are about to call isn't available`
					: msg.toString()
			);
		}
	};

	return (
		<TouchableOpacity
			style={{ marginRight: 20 }}
			activeOpacity={0.8}
			onPress={handleCallUser}
			disabled={load}
		>
			<Feather name="phone" color={"#000"} size={20} />
		</TouchableOpacity>
	);
};

export default ChatCall;
