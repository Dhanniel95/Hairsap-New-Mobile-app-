const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const phone_chars = "012345678987654321";

const mapChatToGifted = (chat: any) => ({
	_id: chat.chatId,
	text: chat.message || "",
	createdAt: new Date(chat.createdAt),
	user: {
		_id: chat.senderId,
		name: `User ${chat.senderId}`, // optional
		avatar: "",
	},
	image: chat.messageType === "photo" ? chat.media?.[0]?.url : undefined,
	video: chat.messageType === "video" ? chat.media?.[0]?.url : undefined,
	thumbnail: chat.media?.length > 0 ? chat.media[0]?.thumbnail : "",
	messageType: chat.messageType,
	metaData: chat.metaData,
});

const generateString = (length: number) => {
	let result = " ";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}

	return result;
};

const generatePhone = (length: number) => {
	let result = " ";
	const charactersLength = phone_chars.length;
	for (let i = 0; i < length; i++) {
		result += phone_chars.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
};

export { generatePhone, generateString, mapChatToGifted };
