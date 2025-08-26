import basicService from "@/redux/basic/basicService";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const TaskTarget = () => {
	const [target, setTarget] = useState(0);

	useEffect(() => {
		loadTarget();
	}, []);

	const loadTarget = async () => {
		try {
			let res = await basicService.getProTarget();
			if (res?.targetAmount) {
				setTarget(res.targetAmount / 100);
			}
		} catch (err) {}
	};

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Text style={[textStyles.textBold]}>This Month target</Text>
			</View>

			<View style={styles.percentages}>
				<Text
					style={[
						textStyles.textMid,
						{ color: colors.mildGray, fontSize: 18 },
					]}
				>
					₦{target.toLocaleString()}
				</Text>
			</View>
		</View>
	);
};

export default TaskTarget;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: colors.white,
		borderRadius: 15,
		marginBottom: 20,
		elevation: 2,
		shadowColor: "grey",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		width: "100%",
	},

	top: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	percentages: {
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
});
