import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { useAppSelector } from "@/utils/hooks";
import { Entypo, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ChatHeader = ({ headerInfo }: { headerInfo: any }) => {
	const router = useRouter();

	const { user } = useAppSelector((state) => state.auth);

	const [openMenu, setOpenMenu] = useState(false);

	const openHandler = () => {
		if (user.role === "consultant") {
			setOpenMenu(!openMenu);
		}
	};

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				paddingHorizontal: 20,
				paddingVertical: 10,
			}}
		>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<TouchableOpacity
					onPress={() => router.back()}
					style={{
						paddingRight: 15,
						paddingVertical: 10,
					}}
				>
					<Feather name="arrow-left" color={"#000"} size={25} />
				</TouchableOpacity>
				<Image
					source={
						headerInfo.image
							? { uri: headerInfo.image }
							: require("../../assets/images/icon.png")
					}
					style={{ height: 40, width: 40, borderRadius: 20 }}
				/>
				<View style={{ marginLeft: 10 }}>
					<Text style={[textStyles.textBold, { fontSize: 15 }]}>
						{headerInfo.user}
					</Text>
					<Text style={[textStyles.text, { fontSize: 13 }]}>
						{user.role === "user" || user.role === "guest"
							? "Active Now (7am - 7pm)"
							: "Active"}
					</Text>
				</View>
			</View>
			<View>
				<TouchableOpacity onPress={openHandler}>
					<Entypo
						name="dots-three-vertical"
						size={20}
						color="black"
					/>
				</TouchableOpacity>
			</View>
			{openMenu && (
				<View style={styles.pos}>
					<TouchableOpacity
						style={{ marginBottom: 10 }}
						onPress={() => {
							setOpenMenu(false);
							router.push({
								pathname: "/(app)/booksumaries",
								params: { userId: headerInfo?.receiverId },
							});
						}}
					>
						<Text style={[textStyles.textMid, { fontSize: 14 }]}>
							Booking Summaries
						</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text style={[textStyles.textMid, { fontSize: 14 }]}>
							Settings
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default ChatHeader;

const styles = StyleSheet.create({
	pos: {
		position: "absolute",
		right: 30,
		top: 70,
		zIndex: 99991,
		backgroundColor: colors.white,
		borderWidth: 1.5,
		borderColor: "#000",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
	},
});
