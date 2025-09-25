import { getUserInfo } from "@/redux/auth/authSlice";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import { useAppDispatch } from "@/utils/hooks";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GuestToUser = ({ closeModal }: { closeModal: () => void }) => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserInfo());
	}, []);

	const reloadHandler = async () => {
		closeModal();
		router.replace("/(tabs-user)/gallery");
	};

	return (
		<View style={{ paddingVertical: 20 }}>
			<Text
				style={[textStyles.textMid, { marginBottom: 20, fontSize: 14 }]}
			>
				A Customer Account has been created for you. You can continue
				using our services with it.
			</Text>
			<TouchableOpacity
				style={[formStyles.mainBtn]}
				onPress={reloadHandler}
			>
				<Text style={[textStyles.textBold, { color: "#FFF" }]}>
					OKAY
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default GuestToUser;
