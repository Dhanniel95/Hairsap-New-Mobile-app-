import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";

const GalleryLoad = () => {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				flexWrap: "wrap",
			}}
		>
			{Array.from({ length: 6 }).map((_, i) => (
				<View style={{ marginBottom: 10, width: "32%" }} key={i}>
					<Skeleton
						height={180}
						width={"100%"}
						radius="square"
						colorMode="light"
					/>
				</View>
			))}
		</View>
	);
};

export default GalleryLoad;
