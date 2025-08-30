import chatService from "@/redux/chat/chatService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { displayError } from "@/utils/error";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import InputField from "../InputField";
import ModalComponent from "../ModalComponent";

const FileMenu = ({ onSend }: { onSend: (arg: any) => void }) => {
	const [media, setMedia] = useState("");
	const [mediaType, setMediaType] = useState("");
	const [openMedia, setOpenMedia] = useState(false);
	const [load, setLoad] = useState(false);
	const [text, setText] = useState("");
	const [savedFile, setSavedFile] = useState<any>({});

	const player = useVideoPlayer(media, (p) => {
		p.loop = false;
	});

	const selectFile = async (type: "images" | "videos") => {
		try {
			await ImagePicker.requestMediaLibraryPermissionsAsync();
			setMediaType(type);
			const { assets, canceled } =
				await ImagePicker.launchImageLibraryAsync({
					mediaTypes: type,
					quality: 0.5,
				});
			if (!canceled) {
				let imgUrl =
					Platform.OS == "ios"
						? assets[0].uri.replace("file://", "")
						: assets[0].uri;
				setMedia(imgUrl);
				saveFile(imgUrl, type);
			}
		} catch (error) {
			console.log("there was an error loading image", error);
		}
	};

	const saveFile = async (uri: string, type: string) => {
		try {
			setOpenMedia(true);
			const formData = new FormData();
			formData.append(type == "images" ? "chatphoto" : "chatvideo", {
				uri: uri,
				type: type == "images" ? "image/jpeg" : "video/mp4",
				name: type == "images" ? "chatphoto.jpg" : "chatvideo.mp4",
			} as any);
			setLoad(true);
			let res;
			if (type === "images") {
				res = await chatService.uploadImage(formData);
			} else {
				res = await chatService.uploadVideo(formData);
			}
			setLoad(false);
			console.log(res, "RES");
			if (res?.data?.url) {
				setSavedFile(res.data);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const sendHandler = () => {
		if (!load) {
			if (savedFile?.url) {
				let payload = {
					url: savedFile.url,
					thumbnail: savedFile.thumbnail,
					text,
					type: mediaType,
				};
				onSend(payload);
			} else {
				displayError(
					"File Upload was not successful. Please try again",
					true
				);
				setOpenMedia(false);
			}
		} else {
			displayError("Please wait for file to load", true);
		}
	};

	return (
		<View style={styles.box}>
			<TouchableOpacity
				activeOpacity={0.8}
				style={{
					alignItems: "center",
					marginHorizontal: 15,
				}}
				onPress={() => selectFile("images")}
			>
				<View style={styles.innerBox}>
					<Feather name="image" size={20} color={"#FFF"} />
				</View>
				<Text
					style={[
						textStyles.textMid,
						{ fontSize: 12, color: "#FFF", marginTop: 6 },
					]}
				>
					Select Image
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				activeOpacity={0.8}
				style={{
					alignItems: "center",
					marginHorizontal: 15,
				}}
				onPress={() => {
					selectFile("videos");
				}}
			>
				<View style={styles.innerBox}>
					<Feather name="video" size={20} color={"#FFF"} />
				</View>
				<Text
					style={[
						textStyles.textMid,
						{ fontSize: 12, color: "#FFF", marginTop: 6 },
					]}
				>
					Select Video
				</Text>
			</TouchableOpacity>
			<ModalComponent
				open={openMedia}
				closeModal={() => setOpenMedia(false)}
				centered
			>
				<View>
					<View style={{ position: "relative", height: 300 }}>
						{mediaType === "images" ? (
							<Image
								source={{ uri: media }}
								style={{ width: "100%", height: 300 }}
							/>
						) : (
							player && (
								<VideoView
									style={{
										width: "100%",
										height: 300,
										backgroundColor: "black",
									}}
									player={player}
									nativeControls
									allowsFullscreen
									allowsPictureInPicture
								/>
							)
						)}
						{load && (
							<ActivityIndicator
								style={{
									position: "absolute",
									top: "50%",
									left: "47%",
								}}
								color={colors.primary}
								size={"large"}
							/>
						)}
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							marginTop: 20,
						}}
					>
						<View style={{ width: "80%" }}>
							<InputField
								val={text}
								setVal={setText}
								placeholder="Type Message"
							/>
						</View>
						<View style={{ marginLeft: 10, marginBottom: 20 }}>
							<TouchableOpacity
								style={styles.sendBtn}
								onPress={sendHandler}
							>
								<Ionicons name="send" size={20} color="#fff" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ModalComponent>
		</View>
	);
};

export default FileMenu;

const styles = StyleSheet.create({
	box: {
		backgroundColor: "#334155",
		borderRadius: 4,
		paddingVertical: 10,
		flexDirection: "row",
		justifyContent: "center",
	},
	innerBox: {
		backgroundColor: "#E5E5E533",
		height: 45,
		width: 45,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 45 / 2,
	},
	sendBtn: {
		backgroundColor: colors.primary,
		height: 40,
		width: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
});
