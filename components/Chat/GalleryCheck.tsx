import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import { useAppSelector } from "@/utils/hooks";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GalleryCheck = () => {
	const router = useRouter();

	const { user } = useAppSelector((state) => state.auth);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				height: 500,
				paddingHorizontal: "10%",
				transform: [{ scaleY: -1 }],
			}}
		>
			<Text
				style={[textStyles.text, { textAlign: "center", fontSize: 14 }]}
			>
				Kindly send a video of your prefered style to start the
				conversation
			</Text>
			<TouchableOpacity
				onPress={() =>
					router.push(
						user.role === "guest"
							? "/(tabs-guest)/gallery"
							: "/(tabs-user)/gallery"
					)
				}
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
