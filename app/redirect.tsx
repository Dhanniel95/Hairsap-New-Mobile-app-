import { getTransport } from "@/redux/basic/basicSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { getStreamClient, initStreamClient } from "@/utils/stream";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, ImageBackground, View } from "react-native";

export default function RedirectPage() {
	const dispatch = useAppDispatch();

	const router = useRouter();
	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (user?.userId) {
			if (user?.role === "consultant") {
				router.replace("/(tabs-consultant)/chats");
			} else if (user?.role === "pro") {
				router.replace("/(tabs-pros)/home");
			} else if (user?.role === "guest") {
				router.replace("/(tabs-guest)/gallery");
			} else {
				router.replace("/(tabs-user)/gallery");
			}
			dispatch(getTransport());
		} else {
			router.replace("/(auth)/guest");
		}
	}, [user, router]);

	useEffect(() => {
		if (user.userId) {
			loadStream();
		}
	}, []);

	useEffect(() => {
		const client = getStreamClient();

		client?.on("call.ring", (event) => {
			console.log(event, "event for Ring");
			router.push("/(app)/call");
		});
	}, []);

	const loadStream = async () => {
		if (user.userId && user.role !== "guest") {
			await initStreamClient({
				id: `${user.userId}`,
				image: user.faceIdPhotoUrl,
				name: user.name,
			});
		}
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
