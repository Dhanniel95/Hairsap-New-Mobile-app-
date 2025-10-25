import ActivePlayer from "@/components/User/ActivePlayer";
import Thumbnail from "@/components/User/Thumbnail";
import { useAppSelector } from "@/utils/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	Pressable,
	StyleSheet,
	View,
} from "react-native";

const Reel = () => {
	const { videos } = useAppSelector((state) => state.book);

	const { height } = Dimensions.get("screen");

	const params = useLocalSearchParams();

	const router = useRouter();

	const { startFrom } = params;

	const [active, setActive] = useState(0);

	const flatListRef = useRef<any>(null);

	const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setActive(viewableItems[0].index);
		}
	}).current;

	const initialIndex = videos.findIndex(
		(item: any) => item.galleryId === Number(startFrom)
	);

	return initialIndex >= 0 ? (
		<View style={{ flex: 1 }}>
			<Pressable style={styles.backButton} onPress={() => router.back()}>
				<Ionicons name="arrow-back" size={28} color="white" />
			</Pressable>
			<View style={{ flex: 1 }}>
				<FlatList
					ref={flatListRef}
					data={videos}
					initialScrollIndex={initialIndex}
					keyExtractor={(item) => item.galleryId.toString()}
					initialNumToRender={1}
					maxToRenderPerBatch={2}
					windowSize={3}
					removeClippedSubviews={true}
					renderItem={({ item, index }) => {
						const shouldMount = index === Number(active);
						return (
							<View
								style={{
									height,
									width: "100%",
									flex: 1,
								}}
							>
								{shouldMount ? (
									<ActivePlayer
										video={item?.items[0]}
										isActive={shouldMount}
									/>
								) : (
									<Thumbnail video={item?.items[0]} />
								)}
							</View>
						);
					}}
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
		</View>
	) : (
		<View style={{ flex: 1, backgroundColor: "red" }}></View>
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
