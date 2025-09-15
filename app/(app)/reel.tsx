import EachVideo from "@/components/List/EachVideo";
import { useAppSelector } from "@/utils/hooks";
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
	const { videos } = useAppSelector((state) => state.book);

	const { height } = useWindowDimensions();

	const params = useLocalSearchParams();

	const router = useRouter();

	const { startFrom } = params;

	const [active, setActive] = useState(startFrom);

	const flatListRef = useRef<any>(null);

	const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setActive(viewableItems[0].index);
		}
	}).current;

	const initialIndex = videos.findIndex(
		(item: any) => item.galleryId === Number(active)
	);

	return (
		<View style={{ flex: 1 }}>
			<Pressable style={styles.backButton} onPress={() => router.back()}>
				<Ionicons name="arrow-back" size={28} color="white" />
			</Pressable>
			<FlatList
				ref={flatListRef}
				data={videos}
				initialScrollIndex={initialIndex >= 0 ? initialIndex : 0}
				keyExtractor={(item) => item.galleryId.toString()}
				renderItem={({ item, index }) => (
					<EachVideo
						video={item?.items[0]}
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
				getItemLayout={(_: any, index: any) => ({
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
