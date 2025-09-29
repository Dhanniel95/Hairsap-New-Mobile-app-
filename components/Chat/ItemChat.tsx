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
					width: "85%",
					backgroundColor: colors.primary,
					paddingHorizontal: 10,
					borderRadius: 10,
				}}
			>
				<View
					style={{
						borderBottomColor: "rgba(255,255,255,0.4)",
						borderBottomWidth: 1,
						paddingVertical: 10,
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
							},
						]}
					>
						{metadata.name}
					</Text>
				</View>
				{metadata.serviceType && (
					<View
						style={{
							borderBottomColor: "rgba(255,255,255,0.4)",
							borderBottomWidth: 1,
							paddingVertical: 10,
						}}
					>
						<Text
							style={[
								textStyles.textBold,
								{ color: "#FFF", fontSize: 14 },
							]}
						>
							Service Type:
						</Text>
						<Text
							style={[
								textStyles.textMid,
								{
									color: "#FFF",
									fontSize: 14,
								},
							]}
						>
							{metadata.serviceType || "---"}
						</Text>
					</View>
				)}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingTop: 10,
						borderBottomColor: "rgba(255,255,255,0.4)",
						borderBottomWidth: 1,
						paddingBottom: 10,
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
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingVertical: 10,
					}}
				>
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
