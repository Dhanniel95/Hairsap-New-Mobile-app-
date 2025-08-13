import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useCallback, useEffect, useState } from "react";
import {
	Pressable,
	StyleSheet,
	TouchableWithoutFeedback,
	useWindowDimensions,
	View,
} from "react-native";

const EachVideo = ({ video, isActive }: { video: any; isActive: boolean }) => {
	const { height, width } = useWindowDimensions();

	const [currentIndex, setCurrentIndex] = useState(0);
	const [isMuted, setIsMuted] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const [duration, setDuration] = useState(0);
	const [position, setPosition] = useState(0);

	const player = useVideoPlayer(video.video, (player) => {
		player.loop = true;
		player.play();
	});

	useEffect(() => {
		if (isActive) {
			player.play();
			setIsPlaying(true);
		} else {
			player.pause();
			setIsPlaying(false);
		}
	}, [isActive]);

	useEffect(() => {
		player.volume = isMuted ? 0 : 1;
	}, [isMuted]);

	const togglePlay = useCallback(() => {
		console.log("first");
		if (isPlaying) {
			player.pause();
		} else {
			player.play();
		}
		setIsPlaying(!isPlaying);
	}, [isPlaying]);

	player.addListener("timeUpdate", () => {
		setPosition(player.currentTime * 1000);
		setDuration(player.duration * 1000);
	});

	const onSliderValueChange = (value: number) => {
		player.currentTime = value / 1000; // convert ms to seconds
	};

	return (
		<View style={{ height, backgroundColor: "#000", flex: 1 }}>
			<TouchableWithoutFeedback onPress={togglePlay}>
				<VideoView
					player={player}
					style={{ width: "100%", height: "100%" }}
					contentFit="cover"
					allowsFullscreen
					allowsPictureInPicture
					nativeControls={false}
				/>
			</TouchableWithoutFeedback>
			<View style={styles.controlsContainer}>
				<Slider
					style={{ flex: 1 }}
					value={position}
					minimumValue={0}
					maximumValue={duration}
					onSlidingComplete={onSliderValueChange}
					minimumTrackTintColor="#fff"
					maximumTrackTintColor="rgba(255,255,255,0.4)"
					thumbTintColor="#fff"
				/>
				<Pressable
					onPress={() => setIsMuted(!isMuted)}
					style={styles.muteButton}
				>
					<Ionicons
						name={isMuted ? "volume-mute" : "volume-high"}
						size={24}
						color="white"
					/>
				</Pressable>
			</View>
		</View>
	);
};

export default EachVideo;

const styles = StyleSheet.create({
	controlsContainer: {
		position: "absolute",
		bottom: 20,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	muteButton: {
		marginLeft: 10,
		padding: 5,
	},
});
