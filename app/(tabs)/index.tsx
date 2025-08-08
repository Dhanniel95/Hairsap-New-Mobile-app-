import Header from "@/components/Header";
import Gallery from "@/components/User/Gallery";
import React from "react";
import { View } from "react-native";

const HomeTab = () => {
	return (
		<View style={{ flex: 1, backgroundColor: "#FFF" }}>
			<Header />
			<Gallery />
		</View>
	);
};

export default HomeTab;
