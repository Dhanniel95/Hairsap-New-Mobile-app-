import MakeCallScreen from "@/components/MakeCall";
import { getStreamClient } from "@/utils/stream";
import { StreamVideo } from "@stream-io/video-react-native-sdk";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CallScreen = () => {
	const client = getStreamClient();

	return client ? (
		<StreamVideo client={client}>
			<MakeCallScreen targetUserId="" />
		</StreamVideo>
	) : (
		<View>
			<Text>CallScreen</Text>
		</View>
	);
};

export default CallScreen;

const styles = StyleSheet.create({});
