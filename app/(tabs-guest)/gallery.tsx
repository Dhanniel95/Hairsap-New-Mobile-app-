import Gallery from "@/components/User/Gallery";
import { useAppSelector } from "@/utils/hooks";
import React from "react";

const GalleryScreen = () => {
	const { user } = useAppSelector((state) => state.auth);
	console.log(user.userId, "id");
	return <Gallery />;
};

export default GalleryScreen;
