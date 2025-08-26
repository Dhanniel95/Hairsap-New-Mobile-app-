import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const Tab = ({
	tabs,
	activeTab,
	setActiveTab,
}: {
	tabs: { id: number; name: string; sub: number | null }[];
	activeTab: number;
	setActiveTab: (arg: number) => void;
}) => {
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View style={{ flexDirection: "row" }}>
				{tabs.map((tab) => (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => setActiveTab(tab.id)}
						key={tab.id}
						style={[
							styles.btn,
							{
								backgroundColor:
									activeTab === tab.id
										? colors.primary
										: colors.midGray,
							},
						]}
					>
						<Text
							style={[
								textStyles.textMid,
								{
									color:
										activeTab === tab.id ? "#FFF" : "#000",
								},
							]}
						>
							{tab.name}
						</Text>
						{tab.sub !== null && (
							<Text
								style={[
									styles.total,
									{
										backgroundColor:
											activeTab === tab.id
												? "#FFF"
												: colors.primary,
										color:
											activeTab === tab.id
												? colors.primary
												: "#FFF",
									},
								]}
							>
								{`(${tab.sub})`}
							</Text>
						)}
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
};

export default Tab;

const styles = StyleSheet.create({
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
		paddingVertical: 6,
		paddingHorizontal: 15,
		borderRadius: 5,
	},
	total: {
		paddingHorizontal: 6,
		paddingVertical: 1,
		marginLeft: 10,
		borderRadius: 5,
	},
});
