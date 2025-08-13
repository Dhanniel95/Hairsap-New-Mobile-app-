import textStyles from "@/styles/textStyles";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ChatHeader = () => {
	const router = useRouter();

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
					source={require("../../assets/images/icon.png")}
					style={{ height: 40, width: 40, borderRadius: 20 }}
				/>
				<View style={{ marginLeft: 10 }}>
					<Text style={[textStyles.textBold, { fontSize: 15 }]}>
						Consultant
					</Text>
					<Text style={[textStyles.text, { fontSize: 13 }]}>
						Active Now
					</Text>
				</View>
			</View>
		</View>
	);
};

export default ChatHeader;

const styles = StyleSheet.create({});
