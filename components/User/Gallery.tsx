import bookService from "@/redux/book/bookService";
import textStyles from "@/styles/textStyles";
import { displayError } from "@/utils/error";
import { useDebounce } from "@/utils/search";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import Header from "../Header";
import EachGallery from "../List/EachGallery";

const Gallery = () => {
	const [search, setSearch] = useState("");

	const debouncedSearch = useDebounce(search);

	const { width } = Dimensions.get("window");

	const viewWidth = width - 40;
	const numColumns = 3;
	const spacing = 5;
	const itemSize = (viewWidth - spacing * (numColumns - 1)) / numColumns;

	const videos = [
		{
			id: 1,
			thumbnail: "UDGcGgtR00xu}ao2NaoL00WB-pR*f7fQj[j[",
			description: "",
			mediaUrl:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			id: 2,
			thumbnail: "https://picsum.photos/200/300",
			description: "",
			mediaUrl:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			id: 3,
			thumbnail: "https://picsum.photos/200/300",
			description: "",
			mediaUrl:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			id: 4,
			thumbnail: "https://picsum.photos/200/300",
			description: "",
			mediaUrl:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			id: 5,
			thumbnail: "https://picsum.photos/200/300",
			description: "",
			mediaUrl:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			id: 6,
			thumbnail: "https://picsum.photos/200/300",
			description: "",
			mediaUrl:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
	];

	useEffect(() => {
		if (debouncedSearch) {
			filterSearch(debouncedSearch);
		}
	}, [debouncedSearch]);

	useEffect(() => {
		listServices();
	}, []);

	const listServices = async () => {
		try {
			let res = await bookService.listServices();
			console.log(res?.data[0]?.items?.length, "RES");
		} catch (err) {
			displayError(err, true);
		}
	};

	const filterSearch = (val: string) => {
		const lowerQuery = val.toLowerCase();

		return videos.filter((video) =>
			video.description.toLowerCase().includes(lowerQuery)
		);
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#FFF" }}>
			<Header />
			<View style={{ flex: 1, paddingHorizontal: 20 }}>
				<View style={{ paddingVertical: 10 }}>
					<Text style={[textStyles.textBold, { fontSize: 17 }]}>
						Gallery
					</Text>
					<View style={{ marginVertical: 15, position: "relative" }}>
						<TextInput
							value={search}
							onChangeText={setSearch}
							placeholder="Search"
							style={styles.input}
							placeholderTextColor={"rgba(0,0,0,0.3)"}
						/>
						<Feather
							name="search"
							color={"rgba(0,0,0,0.3)"}
							size={20}
							style={styles.pos}
						/>
					</View>
				</View>
				<FlatList
					data={videos}
					numColumns={3}
					columnWrapperStyle={{ gap: spacing }}
					contentContainerStyle={{
						gap: spacing,
						paddingBottom: spacing,
					}}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<EachGallery
							gallery={item}
							itemSize={itemSize}
							videos={videos}
						/>
					)}
				/>
			</View>
		</View>
	);
};

export default Gallery;

const styles = StyleSheet.create({
	input: {
		width: "100%",
		borderColor: "rgba(0,0,0,0.3)",
		borderWidth: 1,
		height: 50,
		paddingLeft: 35,
		borderRadius: 20,
		fontFamily: "regular",
		color: "rgba(0,0,0,0.3)",
	},
	pos: {
		position: "absolute",
		top: 14,
		left: 10,
	},
});
