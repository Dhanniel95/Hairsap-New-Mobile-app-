import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GalleryCheck = () => {
	const router = useRouter();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				height: 500,
				paddingHorizontal: "10%",
			}}
		>
			<Text
				style={[textStyles.text, { textAlign: "center", fontSize: 14 }]}
			>
				Kindly send a video of your prefered style to start the
				conversation
			</Text>
			<TouchableOpacity
				onPress={() => router.push("/(tabs)")}
				style={[
					formStyles.mainBtn,
					{ marginTop: 25, borderRadius: 15 },
				]}
			>
				<Text
					style={[textStyles.text, { color: "#FFF", fontSize: 14 }]}
				>
					Check Gallery
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default GalleryCheck;

const styles = StyleSheet.create({});
