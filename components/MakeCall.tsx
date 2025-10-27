import { useAppSelector } from "@/utils/hooks";
import {
	CallContent,
	CallingState,
	IncomingCall,
	StreamCall,
	useCalls,
	useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Button,
	StyleSheet,
	Text,
	View,
} from "react-native";

const MakeCallScreen = ({ targetUserId }: { targetUserId: string }) => {
	const { user } = useAppSelector((state) => state.auth);
	const client = useStreamVideoClient();
	const calls = useCalls();
	const [dialingCall, setDialingCall] = useState<any>(null);

	const incomingCall = calls.find(
		(call) => call.state.callingState === CallingState.RINGING
	);
	const activeCall = calls.find(
		(call) =>
			call.state.callingState === CallingState.JOINING ||
			call.state.callingState === CallingState.JOINED
	);

	console.log(
		calls.map((call) => {
			return call.state.callingState;
		})
	);

	// --- Start audio-only call ---
	const startAudioCall = async () => {
		if (!client) {
			Alert.alert("Error", "Stream client not initialized");
			return;
		}

		if (!user?.userId) {
			Alert.alert("Error", "Missing user IDs");
			return;
		}

		try {
			const callId = `call_${Date.now()}`;
			const call = client.call("default", callId);

			setDialingCall(call); // show "Calling..." UI

			await call.getOrCreate({
				data: {
					members: [{ user_id: `2354` }, { user_id: "2182" }],
				},
				ring: true,
			});

			await call.camera.disable();

			await call.join({ video: false });
			console.log("Audio call started!");
		} catch (err: any) {
			console.error("Error starting call:", err);
			setDialingCall(null);
			Alert.alert("Call Error", err.message || "Failed to start call");
		}
	};

	// --- Incoming call UI ---
	if (incomingCall) {
		return (
			<StreamCall call={incomingCall}>
				<IncomingCall />
			</StreamCall>
		);
	}

	// --- Active / joined call UI ---
	if (activeCall) {
		return (
			<StreamCall call={activeCall}>
				<View style={{ flex: 1, paddingBottom: 50 }}>
					<CallContent
						onHangupCallHandler={() => {
							console.log("Call Ended");
						}}
					/>
				</View>
			</StreamCall>
		);
	}

	// --- Dialing UI (outgoing) ---
	if (dialingCall) {
		return (
			<View style={styles.callingContainer}>
				<ActivityIndicator size="large" color="#007AFF" />
				<Text style={styles.callingText}>
					Calling user {targetUserId}...
				</Text>
				<Button title="Cancel" onPress={() => setDialingCall(null)} />
			</View>
		);
	}

	// --- Idle UI ---
	return (
		<View style={styles.container}>
			<Text style={styles.info}>Ready to make or receive calls</Text>
			<Button
				title={`Call User ${user.userId}`}
				onPress={startAudioCall}
			/>
		</View>
	);
};

export default MakeCallScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	info: {
		fontSize: 16,
		marginBottom: 20,
	},
	callingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	callingText: {
		fontSize: 18,
		marginVertical: 10,
	},
});
