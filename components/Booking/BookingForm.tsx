import basicService from "@/redux/basic/basicService";
import bookService from "@/redux/book/bookService";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import { formatCommas } from "@/utils/currency";
import { formatTime } from "@/utils/datetime";
import { displayError } from "@/utils/error";
import { Feather } from "@expo/vector-icons";
import { addHours, addMinutes, format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import KeyboardWrapper from "../Basics/KeyboardWrapper";
import DatePicker from "../DatePicker";
import InputField from "../InputField";
import SelectField from "../SelectField";

const BookingForm = ({
	userId,
	onClose,
	detail,
}: {
	userId: string;
	onClose: () => void;
	detail?: any;
}) => {
	const [price, setPrice] = useState("");
	const [selectedService, setSelectedService] = useState<any>([]);
	const [list, setList] = useState<any>([]);
	const [duration, setDuration] = useState("");
	const [durationCount, setDurationCount] = useState(0);
	const [address, setAddress] = useState("");
	const [braiders, setBraiders] = useState<any>([]);
	const [selectedBraiders, setSelectedBraiders] = useState([]);
	const [dateTime, setDateTime] = useState("");
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (detail?.bookingId) {
			setSelectedService(
				detail.bookedSubServices.map((b: any) => {
					return b.subService?.subServiceId;
				})
			);
			setAddress(detail.address);
			setDateTime(detail.arrivalAt);
			// setBraiders([detail.pro])
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
								value: s.name,
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
							value: s.name,
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
			setDurationCount(totalDuration * braiderCount);
			setDuration(formatTime(totalDuration * braiderCount));
			setPrice(`₦${formatCommas((totalPrice * braiderCount) / 100)}`);
		} else {
			setDuration("");
			setPrice("");
		}
	};

	const showDateTime = (val: any) => {
		if (val) {
			let valDate = new Date(val);
			let realDate = format(valDate, "yyyy/MM/dd HH:mm");
			let addTime;
			if (durationCount < 60) {
				addTime = format(addMinutes(valDate, durationCount), "HH:mm");
			} else {
				addTime = format(
					addHours(valDate, durationCount / 60),
					"HH:mm"
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
						: [selectedBraiders[0]];
				let payload = {
					assignedProId: Number(selectedBraiders[0]),
					subServiceIds: selectedService,
					pinDate: new Date(dateTime).toISOString(),
					userId: Number(userId),
					address,
					channel: "cash",
					assistantProIds,
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
				console.log(msg, "msg");
				setLoad(false);
				Alert.alert("Error", msg.toString());
			}
		}
	};

	return (
		<View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
			<KeyboardWrapper>
				<SelectField
					multiple={true}
					setValue={setSelectedService}
					label="Service"
					data={list}
					placeholder="Select Service"
					isLight={true}
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
				<SelectField
					setValue={setSelectedBraiders}
					placeholder="Add Braiders"
					data={braiders}
					label="Add Braiders"
					isLight={true}
					multiple={true}
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
								<Feather name="plus" color={"#FFF"} size={20} />
							)}
							<Text
								style={[
									textStyles.textMid,
									{ marginLeft: 10, color: "#FFF" },
								]}
							>
								{detail?.bookingId ? "Update" : "Add"} Booking
							</Text>
						</>
					)}
				</TouchableOpacity>
			</KeyboardWrapper>
		</View>
	);
};

export default BookingForm;
