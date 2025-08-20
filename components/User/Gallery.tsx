import bookService from "@/redux/book/bookService";
import { displayError } from "@/utils/error";
import React, { useEffect } from "react";
import { Dimensions, FlatList, View } from "react-native";
import EachGallery from "../List/EachGallery";

const Gallery = () => {
	const { width } = Dimensions.get("window");

	const viewWidth = width - 40;
	const numColumns = 3;
	const spacing = 5;
	const itemSize = (viewWidth - spacing * (numColumns - 1)) / numColumns;

	const videos = [
		{
			id: 1,
			thumbnail: "https://picsum.photos/200/300",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			id: 2,
			thumbnail: "https://picsum.photos/200/300",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			id: 3,
			thumbnail: "https://picsum.photos/200/300",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			id: 4,
			thumbnail: "https://picsum.photos/200/300",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			id: 5,
			thumbnail: "https://picsum.photos/200/300",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			id: 6,
			thumbnail: "https://picsum.photos/200/300",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
	];

	useEffect(() => {
		listServices();
	}, []);

	const listServices = async () => {
		try {
			let res = await bookService.listServices();
			// console.log(res?.data[0]?.items, "RES");
		} catch (err) {
			displayError(err, true);
		}
	};

	return (
		<View style={{ flex: 1, paddingHorizontal: 20 }}>
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
	);
};

export default Gallery;
