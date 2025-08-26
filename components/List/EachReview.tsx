import colors from "@/utils/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EachReview = ({
	heading,
	date,
	description,
}: {
	description: string;
	date: any;
	heading: string;
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.topSection}>
				<Text style={{ fontFamily: "bold", fontSize: 13 }}>
					{heading}
				</Text>

				<Text style={{ color: colors.mildGray, fontSize: 11 }}>
					{date}
				</Text>
			</View>

			<Text style={{ lineHeight: 21 }}>{description}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.appGray,
		padding: 15,
		width: "100%",
		marginBottom: 15,
	},

	topSection: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
});

export default EachReview;
