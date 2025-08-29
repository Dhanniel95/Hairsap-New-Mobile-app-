import textStyles from "@/styles/textStyles";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const FileMenu = () => {
	const selectFile = async (type: "images" | "videos") => {
		try {
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

				// setmediatype(assets[0].type);

				// setPic(imgUrl);
				// sendImage(imgUrl, assets[0].type);
			}
		} catch (error) {
			console.log("there was an error loading image", error);
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
				onPress={() => console.log("")}
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
					console.log("");
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
});
