import EachVideo from "@/components/List/EachVideo";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	useWindowDimensions,
	View,
} from "react-native";

const Reel = () => {
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

	const { height } = useWindowDimensions();

	const params = useLocalSearchParams();

	const router = useRouter();

	const { startFrom } = params;

	const [active, setActive] = useState(startFrom);

	const flatListRef = useRef(null);

	const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setActive(viewableItems[0].index);
		}
	}).current;

	return (
		<View style={{ flex: 1 }}>
			<Pressable style={styles.backButton} onPress={() => router.back()}>
				<Ionicons name="arrow-back" size={28} color="white" />
			</Pressable>
			<FlatList
				ref={flatListRef}
				data={videos}
				initialScrollIndex={1}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item, index }) => (
					<EachVideo
						video={item}
						isActive={
							Number(index) === Number(active) ? true : false
						}
					/>
				)}
				pagingEnabled
				snapToAlignment="start"
				decelerationRate="fast"
				snapToInterval={height}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
				showsVerticalScrollIndicator={false}
				getItemLayout={(_, index) => ({
					length: height,
					offset: height * index,
					index,
				})}
				onScrollToIndexFailed={({ index, averageItemLength }) => {
					setTimeout(() => {
						flatListRef.current?.scrollToIndex({
							index,
							animated: false,
						});
					}, 100);
				}}
			/>
		</View>
	);
};

export default Reel;

const styles = StyleSheet.create({
	backButton: {
		position: "absolute",
		top: 60, // Adjust for safe area if needed
		left: 20,
		zIndex: 10,
		padding: 6,
		backgroundColor: "rgba(0,0,0,0.4)",
		borderRadius: 20,
	},
});
