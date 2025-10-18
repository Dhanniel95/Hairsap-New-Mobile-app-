import { displayError } from "@/utils/error";
import { ZegoSendCallInvitationButton } from "@zegocloud/zego-uikit-prebuilt-call-rn";
import React from "react";

const ChatCall = ({
	userId,
	username,
}: {
	userId: number;
	username: string;
}) => {
	return (
		<ZegoSendCallInvitationButton
			invitees={[
				{
					userID: `HSP-${userId}`,
					userName: username,
				},
			]}
			isVideoCall={false}
			showWaitingPageWhenGroupCall={true}
			onPressed={(errorCode, errorMessage, errorInvitees) => {
				displayError(
					errorMessage || "Unable to connect at this time",
					true
				);
			}}
		/>
	);
};

export default ChatCall;
