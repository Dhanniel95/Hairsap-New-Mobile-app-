import Gallery from "@/components/User/Gallery";
import { useAppSelector } from "@/utils/hooks";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

const GalleryScreen = () => {
	const router = useRouter();

	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!user.faceIdPhotoUrl) {
			setTimeout(() => {
				router.replace("/(auth)/faceverify");
			}, 1500);
		}
	}, [user]);

	return <Gallery />;
};

export default GalleryScreen;
