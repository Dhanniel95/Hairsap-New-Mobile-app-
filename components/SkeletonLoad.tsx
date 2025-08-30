import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";

const SkeletonLoad = ({ count }: { count: number }) => {
	return (
		<View>
			{Array.from({ length: count }).map((_, i) => (
				<View style={{ marginBottom: 10 }} key={i}>
					<Skeleton
						height={50}
						width={"100%"}
						radius="square"
						colorMode="light"
					/>
				</View>
			))}
		</View>
	);
};

export default SkeletonLoad;
