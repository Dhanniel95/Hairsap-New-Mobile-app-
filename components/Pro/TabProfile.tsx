import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TabProfile = ({
	period,
	setPeriod,
}: {
	setPeriod: (arg: string) => void;
	period: string;
}) => {
	return (
		<View style={styles.toggleContainer}>
			<TouchableOpacity
				style={[
					styles.button,
					{
						backgroundColor:
							period == "this_month"
								? colors.primary
								: colors.appGray,
					},
				]}
				onPress={() => setPeriod("this_month")}
			>
				<Text
					style={[
						textStyles.text,
						{
							color:
								period == "this_month"
									? colors.white
									: colors.dark,
						},
					]}
				>
					This Month
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={[
					styles.button,
					{
						backgroundColor:
							period == "last_month"
								? colors.primary
								: colors.appGray,
					},
				]}
				onPress={() => setPeriod("last_month")}
			>
				<Text
					style={[
						textStyles.text,
						{
							color:
								period == "last_month"
									? colors.white
									: colors.dark,
						},
					]}
				>
					Last Month
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TabProfile;

const styles = StyleSheet.create({
	toggleContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		justifyContent: "space-between",
		marginTop: 20,
	},
	button: {
		padding: 15,
		backgroundColor: colors.primary,
		borderRadius: 6,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 10,
		flexDirection: "row",
	},
});
