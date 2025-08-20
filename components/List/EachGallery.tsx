import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import ModalComponent from "../ModalComponent";

const EachGallery = ({
	gallery,
	itemSize,
	videos,
}: {
	gallery: any;
	itemSize: number;
	videos: any;
}) => {
	const router = useRouter();

	const [open, setOpen] = useState(false);

	return (
		<>
			<Pressable
				onPress={() => setOpen(true)}
				style={{
					width: itemSize,
					height: 180,
					borderRadius: 10,
					position: "relative",
				}}
			>
				<Image
					source={{ uri: gallery.thumbnail }}
					style={{ width: "100%", height: "100%", borderRadius: 10 }}
					resizeMode="stretch"
				/>
				<View style={styles.pos}>
					<Entypo name="video" color={"#FFF"} />
				</View>
			</Pressable>
			<ModalComponent
				open={open}
				closeModal={() => setOpen(false)}
				centered={true}
				bg="transparent"
			>
				<View style={{ backgroundColor: "transparent" }}>
					<Pressable
						style={{
							height: 300,
							width: "100%",
							position: "relative",
						}}
						onPress={() => {
							setOpen(false);
							router.push({
								pathname: "/(app)/reel",
								params: { startFrom: gallery.id, videos },
							});
						}}
					>
						<Image
							source={{ uri: gallery.thumbnail }}
							style={{
								height: "100%",
								width: "100%",
								borderRadius: 10,
							}}
						/>
						<FontAwesome
							name="play"
							color={"#FFF"}
							size={60}
							style={styles.pos2}
						/>
					</Pressable>
					<View
						style={{
							marginVertical: 15,
							backgroundColor: "#000",
							paddingVertical: 15,
							alignItems: "center",
							borderRadius: 5,
						}}
					>
						<Text style={{ fontFamily: "bold", color: "#4ADE80" }}>
							14+ All-back Cornrow
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => {
							setOpen(false);
							router.push({
								pathname: "/(app)/chat",
								params: {
									video: gallery.video,
									text: `Service Name: 14+ All-Back Cornrows \n Regular Service: ₦26,500 • Duration: 4 hrs \n VIP Service: ₦53,000 • Duration: 2 hrs \n Description: One pack of lush extensions included`,
								},
							});
						}}
						activeOpacity={0.8}
						style={{
							backgroundColor: "#14A79F",
							alignItems: "center",
							paddingVertical: 15,
							borderRadius: 10,
						}}
					>
						<Text style={{ fontFamily: "regular", color: "#FFF" }}>
							Seek Consultations
						</Text>
					</TouchableOpacity>
				</View>
			</ModalComponent>
		</>
	);
};

export default EachGallery;

const styles = StyleSheet.create({
	pos: {
		backgroundColor: "#0A0A0A4D",
		position: "absolute",
		height: 30,
		width: 30,
		right: 5,
		top: 5,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	pos2: {
		position: "absolute",
		right: "40%",
		top: "45%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
});
