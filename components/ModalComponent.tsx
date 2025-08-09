import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

const ModalComponent = ({
	open,
	closeModal,
	children,
	centered,
}: {
	open: boolean;
	closeModal: () => void;
	children: React.ReactNode;
	centered?: boolean;
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
					event.target == event.currentTarget && closeModal()
				}
				style={{
					flex: 1,
					backgroundColor: "#000000AA",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View
					style={[
						centered ? styles.modalCenter : styles.modalView,
						{ backgroundColor: "#FFF" },
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
		paddingVertical: 20,
		paddingHorizontal: 25,
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
