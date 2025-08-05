import { useAppSelector } from "@/utils/hooks";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, ImageBackground, View } from "react-native";

export default function RedirectPage() {
	const router = useRouter();
	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (user?.userId) {
			router.replace("/(tabs)");
		} else {
			router.replace("/(auth)/landing");
		}
	}, [user]);

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
