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

const ChatTabs = ({
	setActiveTab,
	activeTab,
	guestList,
	customersList,
	myGuestList,
	myCustomersList,
	braidersList,
}: {
	setActiveTab: (arg: number) => void;
	activeTab: number;
	guestList: number;
	customersList: number;
	myGuestList: number;
	myCustomersList: number;
	braidersList: number;
}) => {
	const chatTabs = [
		{
			id: 1,
			name: "Guests",
			length: guestList,
			sub: "All",
		},
		{
			id: 2,
			name: "Customers",
			length: customersList,
			sub: "All",
		},
		{
			id: 3,
			name: "Guests",
			length: myGuestList,
			sub: "My",
		},
		{
			id: 4,
			name: "Customers",
			length: myCustomersList,
			sub: "My",
		},
		{
			id: 5,
			name: "Braiders",
			length: braidersList,
			sub: "All",
		},
	];

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View style={{ flexDirection: "row" }}>
				{chatTabs.map((tab) => (
					<TouchableOpacity
						key={tab.id}
						activeOpacity={0.8}
						onPress={() => setActiveTab(tab.id)}
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
						<View style={{ alignItems: "center" }}>
							<Text
								style={[
									textStyles.textMid,
									{
										color:
											activeTab === tab.id
												? "#FFF"
												: "#000",
										fontSize: 10,
									},
								]}
							>
								{tab.sub}
							</Text>
							<Text
								style={[
									textStyles.textMid,
									{
										color:
											activeTab === tab.id
												? "#FFF"
												: "#000",
										fontSize: 11,
									},
								]}
							>
								{tab.name}
							</Text>
						</View>
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
									fontSize: 11,
								},
							]}
						>
							{`(${tab.length})`}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
};

export default ChatTabs;

const styles = StyleSheet.create({
	btn: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
		marginRight: 10,
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	total: {
		paddingHorizontal: 6,
		paddingVertical: 1,
		marginLeft: 10,
		borderRadius: 5,
	},
});
