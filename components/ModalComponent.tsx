import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

const ModalComponent = ({
	open,
	closeModal,
	children,
	centered,
	bg,
	maxHeight,
	onlyCancel,
}: {
	open: boolean;
	closeModal: () => void;
	children: React.ReactNode;
	centered?: boolean;
	bg?: string;
	maxHeight?: number;
	onlyCancel?: boolean;
}) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={open}
			onRequestClose={() => {}}
		>
			<Pressable
				onPress={(event) =>
					event.target == event.currentTarget &&
					!onlyCancel &&
					closeModal()
				}
				style={{
					flex: 1,
					backgroundColor: "#000000AA",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{centered && (
					<View style={{ alignItems: "flex-end", width: "85%" }}>
						<TouchableOpacity
							onPress={closeModal}
							style={{
								backgroundColor: "#334155",
								height: 40,
								width: 40,
								borderRadius: 20,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Entypo name="cross" size={25} />
						</TouchableOpacity>
					</View>
				)}
				<View
					style={[
						centered ? styles.modalCenter : styles.modalView,
						{
							backgroundColor: bg || "#FFF",
							maxHeight: maxHeight ? `${maxHeight}%` : "70%",
							overflow: "hidden",
						},
					]}
				>
					{children}
				</View>
			</Pressable>
		</Modal>
	);
};

export default ModalComponent;

const styles = StyleSheet.create({
	modalView: {
		bottom: 0,
		position: "absolute",
		width: "100%",
		paddingVertical: 30,
		paddingHorizontal: 20,
	},
	modalCenter: {
		margin: 20,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: "85%",
	},
});
