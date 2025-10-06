import basicService from "@/redux/basic/basicService";
import bookService from "@/redux/book/bookService";
import chatService from "@/redux/chat/chatService";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import { formatCommas } from "@/utils/currency";
import { formatTime } from "@/utils/datetime";
import { displayError } from "@/utils/error";
import { useAppSelector } from "@/utils/hooks";
import { Feather } from "@expo/vector-icons";
import { addHours, addMinutes, format } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Image,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "../DatePicker";
import InputField from "../InputField";
import MultipleSelect from "../MultipleSelect";

const BookingForm = ({
	userId,
	onClose,
	detail,
}: {
	userId: string;
	onClose: () => void;
	detail?: any;
}) => {
	const { transportFee } = useAppSelector((state) => state.basic);

	const [price, setPrice] = useState("");
	const [selectedService, setSelectedService] = useState<any>([]);
	const [list, setList] = useState<any>([]);
	const [duration, setDuration] = useState("");
	const [durationCount, setDurationCount] = useState(0);
	const [address, setAddress] = useState("");
	const [description, setDescription] = useState("");
	const [mediaUrl, setMediaUrl] = useState("");
	const [braiders, setBraiders] = useState<any>([]);
	const [selectedBraiders, setSelectedBraiders] = useState<any>([]);
	const [dateTime, setDateTime] = useState("");
	const [load, setLoad] = useState(false);
	const [referralCode, setReferralCode] = useState("");
	const [uploadLoad, setUploadLoad] = useState(false);
	const [viewFile, setViewFile] = useState(false);

	useEffect(() => {
		if (detail?.bookingId) {
			setSelectedService(
				detail.bookedSubServices.map((b: any) => {
					return b.subService?.subServiceId;
				})
			);
			setAddress(detail.address);
			setDateTime(detail.arrivalAt);
			setSelectedBraiders(
				Array.from(
					new Set(
						[
							detail.proId,
							...detail?.assistants.map(
								(a: any) => a.assistant?.userId
							),
						].filter((id): id is number => id != null)
					)
				)
			);
		}
	}, [detail]);

	useEffect(() => {
		listServices();
	}, []);

	useEffect(() => {
		updateFields();
	}, [selectedService, selectedBraiders, list]);

	useEffect(() => {
		listBraiders();
	}, [dateTime]);

	const listServices = async () => {
		try {
			let res = await bookService.serviceList();
			if (Array.isArray(res?.data)) {
				let services = res.data[0]?.subServices;
				if (Array.isArray(services)) {
					setList(
						services.map((s: any, i) => {
							return {
								...s,
								value: s.subServiceId,
								label: s.name,
								key: s.subServiceId,
							};
						})
					);
				}
			}
		} catch (err) {}
	};

	const listBraiders = async () => {
		try {
			let res = await basicService.getBraidersAvailability(
				dateTime,
				selectedService?.length > 0 ? selectedService[0] : ""
			);
			if (Array.isArray(res)) {
				setBraiders(
					res.map((s: any) => {
						return {
							...s,
							key: s.userId,
							value: s.userId,
							label: s.name,
						};
					})
				);
			}
		} catch (err) {
			console.log(err, "err");
		}
	};

	const updateFields = () => {
		if (selectedService?.length > 0) {
			const selectedServices = list.filter((val: any) =>
				selectedService.includes(val.subServiceId)
			);

			const totalPrice = selectedServices.reduce(
				(sum: number, item: any) => sum + Number(item.price),
				0
			);
			const totalDuration = selectedServices.reduce(
				(sum: number, item: any) => sum + Number(item.duration),
				0
			);

			const braiderCount =
				selectedBraiders.length > 0 ? selectedBraiders.length : 1;
			setDurationCount(totalDuration / (selectedBraiders.length || 1));
			setDuration(
				formatTime(totalDuration / (selectedBraiders.length || 1))
			);
			console.log(braiderCount, "PRICE", totalPrice);
			let finalP = (totalPrice * braiderCount) / 100;
			let finalT = (transportFee || 0) * braiderCount;
			setPrice(`₦${formatCommas(finalP + finalT)}`);
		} else {
			setDuration("");
			setPrice("");
		}
	};

	const showDateTime = (val: any) => {
		if (val) {
			let valDate = new Date(val);
			let realDate = format(valDate, "dd/MM/yyyy hh:mm a");
			let addTime;
			if (durationCount < 60) {
				addTime = format(addMinutes(valDate, durationCount), "hh:mm a");
			} else {
				addTime = format(
					addHours(valDate, durationCount / 60),
					"hh:mm a"
				);
			}
			return `${realDate} - ${addTime}`;
		} else {
			return "";
		}
	};

	const submitHandler = async () => {
		if (
			selectedBraiders?.length > 0 &&
			selectedService?.length > 0 &&
			dateTime
		) {
			try {
				const assistantProIds =
					selectedBraiders.length > 1
						? selectedBraiders.slice(1).map(Number)
						: [];
				let payload = {
					assignedProId: Number(selectedBraiders[0]),
					subServiceIds: selectedService,
					pinDate: new Date(dateTime).toISOString(),
					userId: Number(userId),
					address,
					channel: "cash",
					assistantProIds,
					description: {
						text: description,
						media: mediaUrl,
					},
					code: referralCode,
				};
				setLoad(true);
				if (detail?.bookingId) {
					await bookService.updateBooking(payload, detail.bookingId);
				} else {
					await bookService.createBooking(payload);
				}
				setLoad(false);
				onClose();
			} catch (err) {
				let msg = displayError(err, false);
				//console.log(err?.response?.data);
				setLoad(false);
				Alert.alert("Error", msg.toString());
			}
		}
	};

	const selectFile = async (type: "images" | "videos") => {
		try {
			await ImagePicker.requestMediaLibraryPermissionsAsync();
			const { assets, canceled } =
				await ImagePicker.launchImageLibraryAsync({
					mediaTypes: type,
					quality: 0.5,
				});
			if (!canceled) {
				let imgUrl =
					Platform.OS == "ios"
						? assets[0].uri.replace("file://", "")
						: assets[0].uri;
				uploadMedia(type, imgUrl);
			}
		} catch (error) {
			console.log("there was an error loading image", error);
		}
	};

	const uploadMedia = async (type: string, url: string) => {
		try {
			const formData = new FormData();
			formData.append(type == "images" ? "chatphoto" : "chatvideo", {
				uri: url,
				type: type == "images" ? "image/jpeg" : "video/mp4",
				name: type == "images" ? "chatphoto.jpg" : "chatvideo.mp4",
			} as any);
			setUploadLoad(true);
			let res;
			if (type === "images") {
				res = await chatService.uploadImage(formData);
			} else {
				res = await chatService.uploadVideo(formData);
			}
			setUploadLoad(false);
			setMediaUrl(res?.data?.url);
		} catch (err) {
			displayError(err, true);
		}
	};

	return (
		<KeyboardAwareScrollView
			enableAutomaticScroll={true}
			showsVerticalScrollIndicator={false}
			enableOnAndroid={true}
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={{}}
		>
			{viewFile ? (
				<View
					style={{
						paddingHorizontal: 15,
						paddingVertical: 20,
						alignItems: "center",
					}}
				>
					<Image
						source={{ uri: mediaUrl }}
						style={{ width: "80%", height: 300 }}
					/>
					<TouchableOpacity
						style={{
							marginTop: 20,
							borderBottomWidth: 1,
							borderBottomColor: "#FFF",
						}}
						onPress={() => setViewFile(false)}
					>
						<Text style={[textStyles.textMid, { color: "#FFF" }]}>
							Cancel
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
					<MultipleSelect
						data={list}
						value={selectedService}
						setValue={setSelectedService}
						placeholder="Select Service"
						isLight={true}
						label="Service"
					/>
					<InputField
						val={price}
						setVal={setPrice}
						label="Price"
						isLight={true}
						editable={false}
					/>
					<InputField
						val={duration}
						setVal={setDuration}
						label="Duration"
						isLight={true}
						editable={false}
					/>
					<InputField
						val={address}
						setVal={setAddress}
						label="Address"
						isLight={true}
					/>
					<DatePicker
						label="Date and Time"
						date={dateTime}
						setDate={setDateTime}
						isLight={true}
						placeholder={showDateTime(dateTime)}
					/>
					<MultipleSelect
						data={braiders}
						value={selectedBraiders}
						setValue={setSelectedBraiders}
						placeholder="Add Braiders"
						isLight={true}
						label="Add Braiders"
					/>
					<InputField
						val={description}
						setVal={setDescription}
						label="Description"
						isLight={true}
						multi={true}
						noMargin={true}
					/>
					<View
						style={{
							backgroundColor: colors.appGray,
							borderRadius: 10,
							flexDirection: "row",
							justifyContent: "space-between",
							paddingHorizontal: 20,
							marginTop: 5,
							marginBottom: 15,
							paddingVertical: 10,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							{uploadLoad && (
								<ActivityIndicator
									color={colors.primary}
									style={{ marginRight: 5 }}
								/>
							)}
							{mediaUrl && (
								<TouchableOpacity
									activeOpacity={0.8}
									onPress={() => setViewFile(true)}
								>
									<Text
										style={[
											textStyles.textBold,
											{ fontSize: 13 },
										]}
									>
										View File
									</Text>
								</TouchableOpacity>
							)}
						</View>
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity
								onPress={() => {
									selectFile("images");
								}}
							>
								<Feather
									name="image"
									size={22}
									color={"#000"}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={{ marginLeft: 10 }}
								onPress={() => {
									selectFile("videos");
								}}
							>
								<Feather
									name="video"
									size={22}
									color={"#000"}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<InputField
						val={referralCode}
						setVal={setReferralCode}
						label="Referral Code"
						isLight={true}
					/>
					<TouchableOpacity
						activeOpacity={0.8}
						style={[formStyles.mainBtn, {}]}
						disabled={load}
						onPress={submitHandler}
					>
						{load ? (
							<ActivityIndicator color={"#FFF"} />
						) : (
							<>
								{!detail && (
									<Feather
										name="plus"
										color={"#FFF"}
										size={20}
									/>
								)}
								<Text
									style={[
										textStyles.textMid,
										{ marginLeft: 10, color: "#FFF" },
									]}
								>
									{detail?.bookingId ? "Update" : "Add"}{" "}
									Booking
								</Text>
							</>
						)}
					</TouchableOpacity>
				</View>
			)}
		</KeyboardAwareScrollView>
	);
};

export default BookingForm;
