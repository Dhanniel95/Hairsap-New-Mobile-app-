import colors from "@/utils/colors";
import React from "react";
import { Text, View } from "react-native";

const RequestList = ({
	title,
	value,
	nOdots,
	width,
}: {
	title: string;
	value: string;
	nOdots?: number;
	width?: number;
}) => {
	var rows = [],
		i = 0,
		len = nOdots || 1;

	while (++i <= len) rows.push(i);
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				marginBottom: 15,
			}}
		>
			<Text style={{ width: `${width || 70}%`, fontFamily: "medium" }}>
				{title}
			</Text>
			{rows.map(function (i) {
				return (
					<Text
						key={i}
						style={{
							color: colors.mildGray,
							fontSize: 11,
							fontFamily: "regular",
						}}
					>
						.
					</Text>
				);
			})}
			<Text style={{ fontFamily: "medium" }}>{value}</Text>
		</View>
	);
};

export default RequestList;
