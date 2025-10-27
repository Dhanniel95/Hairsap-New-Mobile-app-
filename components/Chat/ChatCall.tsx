import { setActiveCall } from "@/redux/call/callSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { getStreamClient } from "@/utils/stream";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

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

	const handleCallUser = async () => {
		const client = getStreamClient();

		if (!client) return;

		try {
			const callId = `${user.userId}-${userId}-${Date.now()}`;
			const call = client.call("default", callId);

			await call.create({
				data: {
					members: [
						{ user_id: `${user.userId}` },
						{ user_id: `${userId}` },
					],
				},
			});

			// await call.join(); // join AFTER creation succeeds

			dispatch(setActiveCall({ callId: call.id, type: "outgoing" }));
			router.push("/(app)/call");
		} catch (error) {
			console.error("Error creating or joining call:", error);
		}
	};

	return (
		<TouchableOpacity
			style={{ marginRight: 20 }}
			activeOpacity={0.8}
			onPress={handleCallUser}
		>
			<Feather name="phone" color={"#000"} size={20} />
		</TouchableOpacity>
	);
};

export default ChatCall;
