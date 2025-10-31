import MakeCall from "@/components/MakeCall";
import { getStreamClient } from "@/utils/stream";
import { StreamVideo } from "@stream-io/video-react-native-sdk";
import React from "react";

const CallScreen = () => {
	const client = getStreamClient();

	if (!client) {
		return <></>;
	}

	return (
		<StreamVideo client={client}>
			<MakeCall />
		</StreamVideo>
	);
};

export default CallScreen;
