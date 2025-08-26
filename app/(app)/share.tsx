import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import colors from "@/utils/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ShareScreen = () => {
	const playstoreLink =
		"https://play.google.com/store/apps/details?id=com.reotech.Hairsap";
	const appstorelink = "https://apps.apple.com/ng/app/Hairsap/id6443979150";
	const message = "Click on the Link to download the Hairsap App:";

	const onShare = async () => {
		try {
			await Share.share({
				message: message + "" + playstoreLink,
			});
		} catch (err) {
			console.log(err);
		}
	};
	const onShare2 = async () => {
		try {
			await Share.share({
				message: message + "" + appstorelink,
			});
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<Container dark={true} bg="#FFF">
			<GoBack
				bgColor={colors.dark}
				iconColor={colors.white}
				title="Share"
			/>
			<View
				style={{
					flex: 1,
					paddingHorizontal: "8%",
					paddingVertical: 40,
				}}
			>
				<TouchableOpacity style={styles.msgContainer} onPress={onShare}>
					<FontAwesome5 name="android" size={30} />
					<View style={styles.txtContainer}>
						<Text
							style={{
								color: colors.mediumGray,
								fontFamily: "regular",
							}}
						>
							Android:
						</Text>
						<Text style={{ fontFamily: "bold" }}>
							Share Android Playstore link
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.msgContainer}
					onPress={onShare2}
				>
					<FontAwesome5 name="apple" size={30} />
					<View style={styles.txtContainer}>
						<Text
							style={{
								color: colors.mediumGray,
								fontFamily: "regular",
							}}
						>
							IOS:
						</Text>
						<Text style={{ fontFamily: "bold" }}>
							Share IOS App store link
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</Container>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		backgroundColor: colors.appBackground,
	},

	msgContainer: {
		backgroundColor: colors.appGray,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 25,
		width: "100%",
		borderRadius: 10,
		marginBottom: 20,
	},

	txtContainer: {
		width: "75%",
	},
});

export default ShareScreen;
