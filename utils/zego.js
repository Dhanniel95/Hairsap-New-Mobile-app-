import * as ZIM from "zego-zim-react-native";

import ZegoUIKitPrebuiltCallService, {
	ZegoInvitationType,
	ZegoMenuBarButtonName,
	ZegoMultiCertificate,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";
import { ZegoLayoutMode } from "@zegocloud/zego-uikit-rn";

const notificationStyle = "CustomView";

export const onUserLogin = async (userID, userName) => {
	return ZegoUIKitPrebuiltCallService.init(
		1499669791,
		"fef5cd5708bd1f97d3d8c885079eb7c167e25cf0efd5706175f80a9e86416ecb",
		userID,
		userName,
		[ZIM],
		{
			ringtoneConfig: {
				incomingCallFileName: "zego_incoming.mp3",
				outgoingCallFileName: "zego_outgoing.mp3",
			},
			// isIOSSandboxEnvironment: undefined,   // false for TestFlight, true for debug, undefined for auto
			certificateIndex: ZegoMultiCertificate.first,
			androidNotificationConfig: {
				channelID: "ZegoUIKit",
				channelName: "ZegoUIKit",
			},
			waitingPageConfig: {},
			requireInviterConfig: {
				enabled: false,
				detectSeconds: 5,
			},
			showDeclineButton: true,
			innerText: {},
			onIncomingCallDeclineButtonPressed: (navigation) => {
				console.log("[onIncomingCallDeclineButtonPressed]");
			},
			onIncomingCallAcceptButtonPressed: (navigation) => {
				console.log("[onIncomingCallAcceptButtonPressed]");
			},
			onOutgoingCallCancelButtonPressed: (
				navigation,
				callID,
				invitees,
				type
			) => {
				console.log(
					"[onOutgoingCallCancelButtonPressed]+++",
					navigation,
					callID,
					invitees,
					type
				);
			},
			onIncomingCallReceived: (
				callID,
				inviter,
				type,
				invitees,
				customData
			) => {
				console.log(
					"[Incoming call]+++",
					callID,
					inviter,
					type,
					invitees,
					customData
				);
			},
			onIncomingCallCanceled: (callID, inviter) => {
				console.log("[onIncomingCallCanceled]+++", callID, inviter);
			},
			onIncomingCallTimeout: (callID, inviter) => {
				console.log("[onIncomingCallTimeout]+++", callID, inviter);
			},
			onOutgoingCallAccepted: (callID, invitee) => {
				console.log("[onOutgoingCallAccepted]+++", callID, invitee);
			},
			onOutgoingCallRejectedCauseBusy: (callID, invitee) => {
				console.log(
					"[onOutgoingCallRejectedCauseBusy]+++",
					callID,
					invitee
				);
			},
			onOutgoingCallDeclined: (callID, invitee) => {
				console.log("[onOutgoingCallDeclined]+++", callID, invitee);
			},
			onOutgoingCallTimeout: (callID, invitees) => {
				console.log("[onOutgoingCallTimeout]+++", callID, invitees);
			},
			requireConfig: (callInvitationData) => {
				console.log(
					"requireConfig, callID: ",
					callInvitationData.callID
				);
				return {
					turnOnMicrophoneWhenJoining: true,
					turnOnCameraWhenJoining:
						callInvitationData.type === ZegoInvitationType.videoCall
							? true
							: false,
					layout: {
						mode:
							callInvitationData.invitees &&
							callInvitationData.invitees.length > 1
								? ZegoLayoutMode.gallery
								: ZegoLayoutMode.pictureInPicture,
						config: {
							removeViewWhenAudioVideoUnavailable: false,
						},
					},
					// foregroundBuilder: () => <ZegoCountdownLabel maxDuration={10} onCountdownFinished={() => { console.log("Countdown finished!!"); ZegoUIKitPrebuiltCallService.hangUp(true); }} />,
					onCallEnd: (callID, reason, duration) => {
						console.log(
							"########CallWithInvitation onCallEnd",
							callID,
							reason,
							duration
						);
					},
					timingConfig: {
						isDurationVisible: true,
						onDurationUpdate: (duration) => {
							console.log(
								"########CallWithInvitation onDurationUpdate",
								userID,
								duration
							);
							if (duration === 10 * 60) {
								ZegoUIKitPrebuiltCallService.hangUp();
							}
						},
					},
					topMenuBarConfig: {
						buttons: [
							ZegoMenuBarButtonName.minimizingButton,
							// ZegoMenuBarButtonName.showMemberListButton
						],
					},
					onWindowMinimized: () => {
						console.log("[Demo]CallInvitation onWindowMinimized");
					},
					onWindowMaximized: () => {
						console.log("[Demo]CallInvitation onWindowMaximized");
					},
				};
			},
		}
	).then(() => {
		if (notificationStyle === "CallStyle") {
			ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
				message:
					"We need your consent for the following permissions in order to use the offline call function properly",
				allow: "Allow",
				deny: "Deny",
			});
		}
	});
};

export const onUserLogout = async () => {
	ZegoUIKitPrebuiltCallService.uninit();
};
