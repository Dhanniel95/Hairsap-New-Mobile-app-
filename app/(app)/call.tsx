import MakeCall from "@/components/MakeCall";
import { useAppSelector } from "@/utils/hooks";
import {
	StreamVideo,
	StreamVideoClient,
	User,
} from "@stream-io/video-react-native-sdk";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const API_KEY = "jhx59nd3q6ys";

const CallScreen = () => {
	const [client, setClient] = useState<StreamVideoClient | null>(null);
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const { user } = useAppSelector((state) => state.auth);

	const login = async () => {
		const token =
			user.userId === 2354
				? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjM1NCJ9.o-kUptC9OLQ0_iHRj5wPLkNPimKBPXf_RCQd_GO8D9k"
				: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjE4MiJ9.ISBIu6BEpDb-CI0d9fbHABkNU9OZwHWA1xDlG2lONWI";
		try {
			const streamUser: User = {
				id: `${user.userId}`,
				name: user.name,
				image: user.faceIdPhotoUrl,
			};

			const client = new StreamVideoClient({
				apiKey: API_KEY,
				user: streamUser,
				token,
			});

			console.log(client, "CLINETT");
			setClient(client);
		} catch (err) {
			console.log(err, "ERR");
		}
	};

	const logout = () => {
		client?.disconnectUser();
		setClient(null);
		setCurrentUser(null);
	};

	return (
		<View style={{ flex: 1 }}>
			{client ? (
				// We are logged in
				<StreamVideo client={client}>
					<View style={styles.container}>
						<Text style={styles.title}>Logged in as:</Text>
						<Button title="Log Out" onPress={logout} />
						<MakeCall targetUserId="" />
					</View>
				</StreamVideo>
			) : (
				<View style={styles.loginContainer}>
					<Text style={styles.title}>Select User to Login</Text>
					<Button title="Login" onPress={() => login()} />
				</View>
			)}
		</View>
	);
};

export default CallScreen;

const styles = StyleSheet.create({
	container: { flex: 1, padding: 10 },
	loginContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
});
