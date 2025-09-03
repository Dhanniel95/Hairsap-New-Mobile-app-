import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import EachNotification from "@/components/List/EachNotification";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { useAppSelector } from "@/utils/hooks";
import React from "react";
import { FlatList, Text, View } from "react-native";

const NotificationScreen = () => {
	const { notiList } = useAppSelector((state) => state.basic);

	return (
		<Container dark={true} bg="#FFF">
			<GoBack
				bgColor={colors.dark}
				iconColor={colors.white}
				title="Notifications"
			/>
			<View
				style={{
					flex: 1,
					paddingHorizontal: "8%",
					paddingVertical: 40,
				}}
			>
				{notiList?.length > 0 ? (
					<FlatList
						data={notiList}
						keyExtractor={(item: any) => item.id.toString()}
						renderItem={({ item }) => (
							<EachNotification item={item} />
						)}
						contentContainerStyle={{ paddingBottom: 100 }}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<Text
						style={[
							textStyles.text,
							{ marginTop: "30%", textAlign: "center" },
						]}
					>
						You have no notifications yet
					</Text>
				)}
			</View>
		</Container>
	);
};

export default NotificationScreen;
