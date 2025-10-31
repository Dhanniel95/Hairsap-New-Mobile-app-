import Container from "@/components/Container";
import { useAppSelector } from "@/utils/hooks";
import {
	CallContent,
	CallingState,
	IncomingCall,
	Lobby,
	StreamCall,
	useCalls,
} from "@stream-io/video-react-native-sdk";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MakeCall = () => {
	const { user } = useAppSelector((state) => state.auth);

	const router = useRouter();

	const insets = useSafeAreaInsets();

	const calls = useCalls();

	const incomingCall = calls.find(
		(call) => call.state.callingState === CallingState.RINGING
	);

	const activeCall = calls.find(
		(call) =>
			call.state.callingState === CallingState.JOINING ||
			call.state.callingState === CallingState.JOINED
	);

	const navigateTo = () => {
		if (user.role === "consultant") {
			router.replace("/(tabs-consultant)/chats");
		} else if (user.role === "pro") {
			router.replace("/(tabs-pros)/home");
		} else if (user.role === "user") {
			router.replace("/(tabs-user)/gallery");
		} else {
			router.replace("/(tabs-guest)/gallery");
		}
	};

	if (incomingCall) {
		return (
			<StreamCall call={incomingCall}>
				<IncomingCall
					onRejectCallHandler={() => {
						incomingCall.endCall();
						incomingCall.leave();
						navigateTo();
					}}
				/>
			</StreamCall>
		);
	}

	if (activeCall) {
		return (
			<StreamCall call={activeCall}>
				<View style={{ flex: 1, paddingBottom: insets.bottom }}>
					<CallContent
						onHangupCallHandler={() => {
							activeCall.endCall();
							activeCall.leave();
							navigateTo();
						}}
					/>
				</View>
			</StreamCall>
		);
	}

	return (
		<Container>
			<View style={{ flex: 1, paddingBottom: insets.bottom }}>
				<Lobby />
			</View>
		</Container>
	);
};

export default MakeCall;
