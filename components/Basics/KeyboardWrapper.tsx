import colors from "@/utils/colors";
import React from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";

function KeyboardWrapper({ children }: { children: React.ReactNode }) {
	return (
		<KeyboardAvoidingView style={{ backgroundColor: colors.white }}>
			<ScrollView>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					{children}
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default KeyboardWrapper;
