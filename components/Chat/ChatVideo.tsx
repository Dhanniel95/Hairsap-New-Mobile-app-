import { VideoView, useVideoPlayer } from "expo-video";
import React from "react";
import { View } from "react-native";

const ChatVideo = ({ uri }: { uri: string }) => {
	const player = useVideoPlayer(uri, (p) => {
		p.loop = false;
	});

	return (
		<View style={{ width: 260, borderRadius: 12, overflow: "hidden" }}>
			<VideoView
				style={{ width: "100%", height: 180, backgroundColor: "black" }}
				player={player}
				nativeControls
				allowsFullscreen
				allowsPictureInPicture
			/>
		</View>
	);
};

export default ChatVideo;
