// import { useAppSelector } from "@/utils/hooks";
// import {
// 	ONE_ON_ONE_VOICE_CALL_CONFIG,
// 	ZegoUIKitPrebuiltCall,
// } from "@zegocloud/zego-uikit-prebuilt-call-rn";
// import { useRouter } from "expo-router";
// import React from "react";
// import { StyleSheet, View } from "react-native";

// const CallScreen = () => {
// 	const router = useRouter();

// 	const callId = "44jr";
// 	const { user } = useAppSelector((state) => state.auth);

// 	return (
// 		<View style={styles.container}>
// 			<ZegoUIKitPrebuiltCall
// 				appID={"1499669791"}
// 				appSign={
// 					"fef5cd5708bd1f97d3d8c885079eb7c167e25cf0efd5706175f80a9e86416ecb"
// 				}
// 				userID={user.userId} // userID can be something like a phone number or the user id on your own user system.
// 				userName={user.name}
// 				callID={callId} // callID can be any unique string.
// 				config={{
// 					// You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
// 					...ONE_ON_ONE_VOICE_CALL_CONFIG,
// 					onCallEnd: (callID, reason, duration) => {
// 						router.replace("/(tabs-consultant)/chats");
// 					},
// 				}}
// 			/>
// 		</View>
// 	);
// };

// export default CallScreen;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		zIndex: 0,
// 	},
// });

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CallScreen = () => {
	return (
		<View>
			<Text>CallScreen</Text>
		</View>
	);
};

export default CallScreen;

const styles = StyleSheet.create({});
