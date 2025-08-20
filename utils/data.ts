const mapChatToGifted = (chat: any) => ({
	_id: chat.chatId,
	text: chat.message || "",
	createdAt: new Date(chat.createdAt),
	user: {
		_id: chat.senderId,
		name: `User ${chat.senderId}`, // optional
		// avatar: someUrl
	},
	image: chat.messageType === "image" ? chat.media?.[0]?.url : undefined,
	video: chat.messageType === "video" ? chat.media?.[0]?.url : undefined,
});

export { mapChatToGifted };
