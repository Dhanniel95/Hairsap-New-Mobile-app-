import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import authService from "@/redux/auth/authService";
import { saveUserData } from "@/redux/auth/authSlice";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { displayError } from "@/utils/error";
import { useAppDispatch } from "@/utils/hooks";
import { Camera, CameraView } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

const FaceVerify = () => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const params = useLocalSearchParams();

	const [hasCameraPermission, setHasCameraPermission] = useState<
		null | boolean
	>(null);
	const [camera, setCamera] = useState<any>(null);
	const [image, setImage] = useState(null);
	const [screenState, setScreenState] = useState("");
	const [load, setLoad] = useState(false);

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			const granted = cameraStatus.status;
			if (granted === "granted") {
				setHasCameraPermission(true);
			} else {
				setHasCameraPermission(false);
				alert(
					"Please you need to grant access to your camera from your phone settings to proceed"
				);
			}
		})();
	}, [hasCameraPermission]);

	const takePicture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync(null);

			setImage(data.uri);
			submitImage(data.uri);
		}
	};

	const submitImage = async (uri: any) => {
		try {
			const form = new FormData();
			form.append("faceid", {
				name: "faceid.jpg",
				uri: uri,
				type: "image/jpeg",
			});
			setLoad(true);
			await authService.uploadFaceId(form);
			setLoad(false);
			showMessage({
				duration: 3000,
				message: "Great!",
				description: "Successfully uploaded face biometric",
				type: "success",
			});
			let res = await dispatch(saveUserData(params)).unwrap();
			if (res) {
				router.replace("/(tabs)");
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<Container dark={true} bg="#FFF">
			<GoBack
				bgColor={colors.dark}
				iconColor={colors.white}
				title="Face Verification"
			/>
			{screenState === "failed" ? (
				<View style={styles.loadingScreen}>
					<Image
						source={require("../../assets/images/no_face.png")}
						style={{ height: 200, width: "80%", marginBottom: 30 }}
					/>

					<Text
						style={[
							textStyles.text,
							{ fontSize: 14, textAlign: "center", width: "90%" },
						]}
					>
						Sorry! We couldn't detect a face. please retake one
						where your faces shows.
					</Text>
					<View style={{ width: "100%", paddingHorizontal: "10%" }}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {
								setScreenState("");
								setImage(null);
							}}
							style={[
								formStyles.mainBtn,
								{
									backgroundColor: colors.secondary,
									marginTop: 30,
								},
							]}
						>
							<Text
								style={[textStyles.textBold, { color: "#FFF" }]}
							>
								Retake
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : screenState === "loading" ? (
				<View style={styles.loadingScreen}>
					<Image
						source={require("../../assets/images/animation.gif")}
						style={{ height: 300, width: 300, marginBottom: 25 }}
					/>
					<Text
						style={[
							textStyles.text,
							{ fontSize: 14, textAlign: "center", width: "90%" },
						]}
					>
						Please hold while we process your face biometrics
					</Text>
				</View>
			) : (
				<>
					<View style={styles.imgContainer}>
						{hasCameraPermission ? (
							image ? (
								<Image
									source={{ uri: image }}
									style={{
										transform: [{ scaleX: -1 }],
										height: "100%",
										width: "100%",
									}}
								/>
							) : (
								<CameraView
									ref={(ref) => setCamera(ref)}
									style={{ height: "100%", width: "100%" }}
									facing={"front"}
								></CameraView>
							)
						) : (
							<Image
								source={require("../../assets/images/camera2.jpg")}
								style={{
									transform: [{ scaleX: -1 }],
									height: "100%",
									width: "100%",
								}}
							/>
						)}
					</View>
					{!hasCameraPermission ? (
						<>
							<Text
								style={[
									textStyles.textMid,
									{
										paddingHorizontal: 50,
										textAlign: "center",
										marginTop: 20,
									},
								]}
							>
								Ensure you have enabled Camera permissions for
								this app
							</Text>
							<TouchableOpacity
								style={{
									justifyContent: "center",
									alignItems: "center",
									marginTop: 25,
								}}
							>
								<Text style={[textStyles.textMid]}>Reload</Text>
							</TouchableOpacity>
						</>
					) : (
						<View style={{ width: "100%", paddingHorizontal: 30 }}>
							<View style={styles.explanation}>
								<Text
									style={[
										textStyles.text,
										{ marginBottom: 15, fontSize: 13 },
									]}
								>
									* Make sure your face shows clearly and
									you're in a well-lit room
								</Text>

								<Text
									style={[textStyles.text, { fontSize: 13 }]}
								>
									* This is to help create a secured
									environment for our beauty pros when they
									come into your private space.
								</Text>
							</View>
						</View>
					)}
					<View style={{ width: "100%", paddingHorizontal: "10%" }}>
						<TouchableOpacity
							disabled={load}
							style={[
								formStyles.mainBtn,
								{
									backgroundColor: colors.secondary,
									marginTop: 30,
								},
							]}
							onPress={takePicture}
						>
							{load ? (
								<ActivityIndicator color={"#FFF"} />
							) : (
								<Text
									style={[
										textStyles.textBold,
										{ color: "#FFF" },
									]}
								>
									Scan my Face
								</Text>
							)}
						</TouchableOpacity>
					</View>
				</>
			)}
		</Container>
	);
};

export default FaceVerify;

const styles = StyleSheet.create({
	imgContainer: {
		alignSelf: "center",
		width: 250,
		height: 250,
		overflow: "hidden",
		borderRadius: 125,
		marginTop: 30,
		borderWidth: 2,
		borderColor: colors.lightGreen,
	},
	explanation: {
		backgroundColor: colors.appGray,
		padding: 15,
		width: "100%",
		borderRadius: 12,
		marginTop: 35,
		fontFamily: "regular",
	},
	loadingScreen: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30,
		paddingHorizontal: 30,
	},
});
