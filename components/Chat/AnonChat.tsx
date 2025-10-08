import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AnonChat = ({ info }: { info: any }) => {
	return (
		<View style={{ alignItems: "center", width: "100%" }}>
			<Text
				style={{
					backgroundColor: "#F2F7FB",
					padding: 10,
					fontSize: 13,
					fontFamily: "regular",
				}}
			>
				{info?.text}
			</Text>
		</View>
	);
};

export default AnonChat;

const styles = StyleSheet.create({});
