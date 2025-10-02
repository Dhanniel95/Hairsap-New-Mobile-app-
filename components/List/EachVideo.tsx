import bookService from "@/redux/book/bookService";
import { useAppSelector } from "@/utils/hooks";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	useWindowDimensions,
	View,
} from "react-native";

const EachVideo = ({ video, isActive }: { video: any; isActive: boolean }) => {
	const router = useRouter();

	const { user } = useAppSelector((state) => state.auth);

	const { height } = useWindowDimensions();

	const [isMuted, setIsMuted] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const [duration, setDuration] = useState(0);
	const [position, setPosition] = useState(0);
	const [load, setLoad] = useState(false);
	const [loadC, setLoadC] = useState(false);

	const player = useVideoPlayer(video.mediaUrl, (player) => {
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
		if (isPlaying) {
			player.pause();
		} else {
			player.play();
		}
		setIsPlaying(!isPlaying);
	}, [isPlaying]);

	useEffect(() => {
		const handleChange = () => {
			if (player.status === "loading") {
				setLoad(true);
			} else if (player.status === "readyToPlay") {
				setLoad(false);
			}
		};

		player.addListener("statusChange", handleChange); // video data loaded

		return () => {
			player.removeListener("statusChange", handleChange);
		};
	}, [player]);

	useEffect(() => {
		if (player.status !== "readyToPlay") return;
		const onTimeUpdate = () => {
			setPosition(player.currentTime * 1000);
			setDuration(player.duration * 1000);
		};

		player.addListener("timeUpdate", onTimeUpdate);

		return () => {
			player.removeListener("timeUpdate", onTimeUpdate);
		};
	}, [player, player.status]);

	useEffect(() => {
		return () => {
			try {
				if (player && player.status == "readyToPlay") {
					player.pause();
					player.currentTime = 0;
				}
			} catch (e) {
				console.warn("Failed to pause player on cleanup:", e);
			}
		};
	}, [player]);

	const onSliderValueChange = (value: number) => {
		setPosition(value);
	};

	const onSlidingComplete = (value: number) => {
		player.currentTime = value / 1000; // actually seek video
	};

	const seekHandler = async () => {
		try {
			setLoadC(true);
			await bookService.seekConsultation({
				userId: user.userId,
				galleryId: video.galleryId,
				galleryItemId: video.galleryId,
			});
			setLoadC(false);
			player.pause();
			router.push(
				user.role === "guest"
					? "/(tabs-guest)/consult"
					: "/(tabs-user)/consult"
			);
		} catch (err) {
			setLoadC(false);
		}
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
			<View style={styles.textArea}>
				<TouchableOpacity
					onPress={() => {
						seekHandler();
					}}
					activeOpacity={0.8}
					disabled={loadC}
					style={{
						backgroundColor: "#14A79F",
						alignItems: "center",
						paddingVertical: 15,
						borderRadius: 10,
					}}
				>
					{loadC ? (
						<ActivityIndicator />
					) : (
						<Text style={{ fontFamily: "regular", color: "#FFF" }}>
							Seek Consultations
						</Text>
					)}
				</TouchableOpacity>
			</View>
			<View style={styles.controlsContainer}>
				<Slider
					style={{ flex: 1 }}
					value={position}
					minimumValue={0}
					maximumValue={duration}
					onValueChange={onSliderValueChange}
					onSlidingComplete={onSlidingComplete}
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
			{load && (
				<View
					style={{
						...StyleSheet.absoluteFillObject,
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "rgba(0,0,0,0.3)",
					}}
				>
					<ActivityIndicator size="large" color="#fff" />
				</View>
			)}
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
	textArea: {
		position: "absolute",
		bottom: 80,
		width: "100%",
		paddingHorizontal: 30,
	},
});
