import { Modal, Pressable, StyleSheet, View } from "react-native";

const ModalComponent = ({
	open,
	children,
	closeModal,
	bgColor,
	centered,
}: {
	open: boolean;
	children: React.ReactNode;
	closeModal: () => void;
	bgColor?: string;
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
						{ backgroundColor: bgColor || "transparent" },
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
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 5,
		paddingVertical: 20,
		paddingHorizontal: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		minHeight: 300,
	},
});
