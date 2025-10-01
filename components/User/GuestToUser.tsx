import { getUserInfo } from "@/redux/auth/authSlice";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GuestToUser = ({ closeModal }: { closeModal: () => void }) => {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getUserInfo());
	}, []);

	const reloadHandler = async () => {
		closeModal();
		if (user.changePassword) {
			router.replace({
				pathname: "/(app)/changepassword",
				params: { new: "true" },
			});
		} else {
			router.replace("/(tabs-user)/gallery");
		}
	};

	return (
		<View style={{ paddingVertical: 20 }}>
			<Text
				style={[textStyles.textMid, { marginBottom: 20, fontSize: 14 }]}
			>
				{user?.changePassword
					? `A Customer Account has been created for you. You can continue
				using our services with it.`
					: `Welcome Back, ${user?.name}`}
			</Text>
			<TouchableOpacity
				style={[formStyles.mainBtn]}
				onPress={reloadHandler}
			>
				<Text style={[textStyles.textBold, { color: "#FFF" }]}>
					CLOSE
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default GuestToUser;
