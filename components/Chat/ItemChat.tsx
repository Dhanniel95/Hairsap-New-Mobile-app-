import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { formatCommas } from "@/utils/currency";
import { useAppSelector } from "@/utils/hooks";
import React from "react";
import { Text, View } from "react-native";

const ItemChat = ({ metadata, isUser }: { metadata: any; isUser: boolean }) => {
	const { user } = useAppSelector((state) => state.auth);

	return (
		<View
			style={{
				marginBottom: 10,
				width: "100%",
				alignItems:
					user.role === "consultant" ? "flex-start" : "flex-end",
			}}
		>
			<View
				style={{
					width: "75%",
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
							textStyles.textMid,
							{
								color: "#FFF",
								fontSize: 14,
							},
						]}
					>
						{metadata.serviceName}
					</Text>
				</View>
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
							{ color: "#FFF", fontSize: 15 },
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
								marginTop: 8,
							},
						]}
					>
						<Text style={{ fontFamily: "bold" }}>
							Regular Premium:
						</Text>{" "}
						₦{formatCommas(metadata.premiumServicePrice / 100)}
					</Text>
					<Text
						style={[
							textStyles.textMid,
							{
								color: "#FFF",
								fontSize: 14,
								marginTop: 8,
							},
						]}
					>
						<Text style={{ fontFamily: "bold" }}>Duration:</Text>{" "}
						{metadata.premiumServiceDuration}
					</Text>
					<Text
						style={[
							textStyles.textMid,
							{
								color: "#FFF",
								fontSize: 14,
								marginTop: 8,
							},
						]}
					>
						<Text style={{ fontFamily: "bold" }}>VIP Service:</Text>{" "}
						₦{formatCommas(metadata.vipServicePrice / 100)}
					</Text>
					<Text
						style={[
							textStyles.textMid,
							{
								color: "#FFF",
								fontSize: 14,
								marginTop: 8,
							},
						]}
					>
						<Text style={{ fontFamily: "bold" }}>Duration:</Text>{" "}
						{metadata.vipServiceDuration}
					</Text>
				</View>
				{metadata.description && (
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
							Description:
						</Text>
						<Text
							style={[
								textStyles.textMid,
								{ color: "#FFF", fontSize: 14, marginLeft: 4 },
							]}
						>
							{metadata.description}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};

export default ItemChat;
