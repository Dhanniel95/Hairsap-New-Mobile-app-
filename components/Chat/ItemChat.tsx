import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { formatCommas } from "@/utils/currency";
import { formatTime } from "@/utils/datetime";
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
					user.role === "consultant" ? "flex-end" : "flex-start",
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
						paddingTop: 10,
						paddingBottom: 20,
					}}
				>
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
						Regular Premium Service: ₦
						{formatCommas(metadata.premiumServicePrice / 100)} (
						{formatTime(metadata.premiumServiceDuration)})
					</Text>
					<Text
						style={[
							textStyles.textMid,
							{
								color: "#FFF",
								fontSize: 14,
								marginTop: 12,
							},
						]}
					>
						VIP Service: ₦
						{formatCommas(metadata.vipServicePrice / 100)} (
						{formatTime(metadata.vipServiceDuration)})
					</Text>
				</View>
				{user.role === "consultant" && metadata.description && (
					<View
						style={{
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
								{ color: "#FFF", fontSize: 14, marginTop: 4 },
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
