import { Image } from "expo-image";
import React from "react";

const Thumbnail = ({ video }: { video: any }) => {
	return (
		<Image
			source={{ uri: video.thumbnail }}
			style={{ width: "100%", height: "100%", borderRadius: 10 }}
			placeholder={{ blurhash: video.thumbnail }}
			contentFit="cover"
		/>
	);
};

export default Thumbnail;
