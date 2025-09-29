import { Ionicons } from "@expo/vector-icons";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Modal,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";

const ChatVideo = ({ uri, load }: { uri: string; load: boolean }) => {
	const player = useVideoPlayer(uri, (p) => {
		p.loop = false;
	});

	const [isPlaying, setIsPlaying] = useState(false);
	const [fullscreen, setFullscreen] = useState(false);

	return (
		<View style={{ width: 260, borderRadius: 12, overflow: "hidden" }}>
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={() => {
					setFullscreen(true);
					player.play();
				}}
			>
				<VideoView
					style={{
						width: "100%",
						height: 180,
						backgroundColor: "black",
					}}
					player={player}
					nativeControls={false} // no controls in chat
				/>

				{!isPlaying && (
					<View style={styles.playOverlay}>
						<Ionicons name="play" size={32} color="white" />
					</View>
				)}
			</TouchableOpacity>
			{load && (
				<ActivityIndicator
					size="small"
					color="white"
					style={{ position: "absolute", top: "45%", left: "45%" }}
				/>
			)}
			<Modal visible={fullscreen} animationType="fade">
				<View style={{ flex: 1, backgroundColor: "black" }}>
					<VideoView
						style={{ flex: 1 }}
						player={player}
						nativeControls={false} // here native controls are allowed
						allowsFullscreen
						allowsPictureInPicture
					/>
					<TouchableOpacity
						onPress={() => {
							player.pause();
							setFullscreen(false);
						}}
						style={styles.closeBtn}
					>
						<Ionicons name="close" size={28} color="white" />
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
};

const styles = {
	playOverlay: {
		position: "absolute",
		top: "40%",
		left: "40%",
		backgroundColor: "rgba(0,0,0,0.5)",
		borderRadius: 40,
		padding: 12,
	} as ViewStyle,
	expandBtn: {
		position: "absolute",
		bottom: 8,
		right: 8,
		backgroundColor: "rgba(0,0,0,0.5)",
		borderRadius: 20,
		padding: 6,
	} as ViewStyle,
	closeBtn: {
		position: "absolute",
		top: 40,
		right: 20,
		backgroundColor: "rgba(0,0,0,0.5)",
		borderRadius: 20,
		padding: 6,
	} as ViewStyle,
};

export default ChatVideo;
