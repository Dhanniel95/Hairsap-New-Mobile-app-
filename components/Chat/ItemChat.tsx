import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { formatCurrency } from "@/utils/currency";
import { formatTime } from "@/utils/datetime";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ItemChat = ({ metadata, isUser }: { metadata: any; isUser: boolean }) => {
	return (
		<View style={{ flexDirection: isUser ? "row-reverse" : "row" }}>
			<View
				style={{
					width: "80%",
					backgroundColor: colors.primary,
					alignItems: "flex-end",
					paddingHorizontal: 10,
					paddingVertical: 6,
					borderRadius: 10,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						flexWrap: "wrap",
						justifyContent: "flex-end",
					}}
				>
					<Text
						style={[
							textStyles.textBold,
							{ color: "#FFF", fontSize: 14 },
						]}
					>
						Service Name:
					</Text>
					<Text
						style={[
							textStyles.textMid,
							{
								color: "#FFF",
								fontSize: 14,
								maxWidth: "90%",
								textAlign: "right",
								marginLeft: 5,
							},
						]}
					>
						{metadata.name}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 5,
					}}
				>
					<Text
						style={[
							textStyles.textBold,
							{ color: "#FFF", fontSize: 14 },
						]}
					>
						Duration:
					</Text>
					<Text
						style={[
							textStyles.textMid,
							{ color: "#FFF", fontSize: 14, marginLeft: 4 },
						]}
					>
						{formatTime(metadata.duration)}
					</Text>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text
						style={[
							textStyles.textBold,
							{ color: "#FFF", fontSize: 14 },
						]}
					>
						Price:
					</Text>
					<Text
						style={[
							textStyles.textMid,
							{ color: "#FFF", fontSize: 14, marginLeft: 4 },
						]}
					>
						₦{formatCurrency(metadata.price / 100)}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default ItemChat;

const styles = StyleSheet.create({});
