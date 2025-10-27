import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { initStreamClient } from "@/utils/stream";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, ImageBackground, View } from "react-native";

export default function RedirectPage() {
	const dispatch = useAppDispatch();

	const router = useRouter();
	const { user } = useAppSelector((state) => state.auth);
	const { activated } = useAppSelector((state) => state.call);

	// useEffect(() => {
	// 	if (user?.userId) {
	// 		if (user?.role === "consultant") {
	// 			router.replace("/(tabs-consultant)/chats");
	// 		} else if (user?.role === "pro") {
	// 			router.replace("/(tabs-pros)/home");
	// 		} else if (user?.role === "guest") {
	// 			router.replace("/(tabs-guest)/gallery");
	// 		} else {
	// 			router.replace("/(tabs-user)/gallery");
	// 		}
	// 		dispatch(getTransport());
	// 	} else {
	// 		router.replace("/(auth)/guest");
	// 	}
	// }, [user, router]);

	useEffect(() => {
		if (user.userId) {
			loadStream();
		}
	}, []);

	const loadStream = async () => {
		await initStreamClient(
			{
				id: `${user.userId}`,
				image: user.faceIdPhotoUrl,
				name: user.name,
			},
			user.userId == 2182
				? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjE4MiJ9.ISBIu6BEpDb-CI0d9fbHABkNU9OZwHWA1xDlG2lONWI"
				: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjM1NCJ9.o-kUptC9OLQ0_iHRj5wPLkNPimKBPXf_RCQd_GO8D9k"
		);
		router.push("/(app)/call");
	};

	return (
		<ImageBackground
			source={require("../assets/images/hairsap_home.png")}
			resizeMode="cover"
			style={{ flex: 1 }}
		>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator color={"#fff"} size={"large"} />
			</View>
		</ImageBackground>
	);
}
