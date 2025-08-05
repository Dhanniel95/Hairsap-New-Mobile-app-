import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import { Link } from "expo-router";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

const Landing = () => {
	return (
		<ImageBackground
			source={require("../../assets/images/hairsap_home.png")}
			resizeMode="cover"
			style={{ flex: 1 }}
		>
			<View
				style={{
					alignItems: "center",
					flex: 1,
					justifyContent: "center",
					paddingHorizontal: "10%",
				}}
			>
				{/* <Logo height={90} width={190} /> */}
				<Text
					style={[
						textStyles.textMid,
						{
							fontSize: 17,
							color: "#FFF",
							marginTop: 15,
							marginBottom: 25,
						},
					]}
				>
					Home Beauty Service
				</Text>
				<Link
					href={"/(auth)/login"}
					asChild
					style={[formStyles.mainBtn, { marginBottom: 20 }]}
				>
					<TouchableOpacity activeOpacity={0.8}>
						<Text style={[textStyles.textBold, { color: "#FFF" }]}>
							Log In
						</Text>
					</TouchableOpacity>
				</Link>
				<Link
					href={"/(auth)/register"}
					asChild
					style={[
						formStyles.mainBtn,
						{
							backgroundColor: "transparent",
							borderColor: "#FFF",
							marginTop: 20,
						},
					]}
				>
					<TouchableOpacity activeOpacity={0.8}>
						<Text style={[textStyles.textBold, { color: "#FFF" }]}>
							Create an account
						</Text>
					</TouchableOpacity>
				</Link>
				<View
					style={{
						justifyContent: "flex-end",
						alignItems: "flex-end",
						marginTop: 30,
						width: "100%",
					}}
				>
					<TouchableOpacity
						style={{
							borderBottomWidth: 1,
							borderBottomColor: "#FFF",
						}}
					>
						<Text
							style={[
								textStyles.textMid,
								{ color: "#FFF", fontSize: 17 },
							]}
						>
							Skip
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
};

export default Landing;
