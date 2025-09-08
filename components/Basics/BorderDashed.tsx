import React from "react";
import { View } from "react-native";

const BorderDashed = ({ color, width }: { color: string; width?: number }) => {
	return (
		<View style={[{ height: 1, overflow: "hidden" }]}>
			<View
				style={[
					{
						height: 2,
						borderWidth: width || 1,
						borderColor: color,
						borderStyle: "dashed",
					},
				]}
			></View>
		</View>
	);
};

export default BorderDashed;
