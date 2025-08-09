import colors from "@/utils/colors";
import React from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
	View,
} from "react-native";

function KeyboardWrapper({ children }: { children: React.ReactNode }) {
	return (
		<KeyboardAvoidingView
			style={{ backgroundColor: colors.white, height: "100%" }}
		>
			<ScrollView>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View>{children}</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default KeyboardWrapper;
