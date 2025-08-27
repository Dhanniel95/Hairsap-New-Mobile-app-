import React from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
	View,
} from "react-native";

function KeyboardWrapper({
	children,
	bg,
}: {
	children: React.ReactNode;
	bg?: string;
}) {
	return (
		<KeyboardAvoidingView style={{ backgroundColor: bg || "transparent" }}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View>{children}</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default KeyboardWrapper;
