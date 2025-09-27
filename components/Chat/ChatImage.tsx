import React from "react";
import { ActivityIndicator, Image, View } from "react-native";

const ChatImage = ({ uri, load }: { uri: string; load: boolean }) => {
	return (
		<View>
			<Image
				source={{ uri }}
				style={{
					width: 150,
					height: 150,
					borderRadius: 8,
					opacity: load ? 0.5 : 1,
				}}
			/>
			{load && (
				<ActivityIndicator
					size="small"
					color="white"
					style={{ position: "absolute", top: "45%", left: "45%" }}
				/>
			)}
		</View>
	);
};

export default ChatImage;
