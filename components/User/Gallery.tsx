import { listGallery } from "@/redux/book/bookSlice";
import textStyles from "@/styles/textStyles";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
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
import GalleryLoad from "../Load/GalleryLoad";

const Gallery = () => {
	const dispatch = useAppDispatch();

	const [search, setSearch] = useState("");
	const [searchList, setSearchList] = useState<any>([]);

	const debouncedSearch = useDebounce(search);

	const { width } = Dimensions.get("window");

	const viewWidth = width - 40;
	const numColumns = 3;
	const spacing = 5;
	const itemSize = (viewWidth - spacing * (numColumns - 1)) / numColumns;

	const { videos } = useAppSelector((state) => state.book);

	useEffect(() => {
		dispatch(listGallery());
	}, []);

	useEffect(() => {
		if (debouncedSearch) {
			filterSearch(debouncedSearch);
		}
	}, [debouncedSearch]);

	const filterSearch = (val: string) => {
		const lowerQuery = val.toLowerCase();

		setSearchList(
			videos.filter(
				(video: any) =>
					video?.description.toLowerCase().includes(lowerQuery) ||
					video?.subService?.name.toLowerCase().includes(lowerQuery)
			)
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
				{videos.length > 0 ? (
					<FlatList
						data={search.length > 0 ? searchList : videos}
						numColumns={3}
						columnWrapperStyle={{ gap: spacing }}
						contentContainerStyle={{
							gap: spacing,
							paddingBottom: spacing,
						}}
						keyExtractor={(item) => item.galleryId.toString()}
						renderItem={({ item }) => (
							<EachGallery
								gallery={item}
								itemSize={itemSize}
								videos={videos}
							/>
						)}
					/>
				) : (
					<GalleryLoad />
				)}
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
