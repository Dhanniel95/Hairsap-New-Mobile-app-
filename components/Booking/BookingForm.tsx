import basicService from "@/redux/basic/basicService";
import bookService from "@/redux/book/bookService";
import formStyles from "@/styles/formStyles";
import textStyles from "@/styles/textStyles";
import { formatTime } from "@/utils/datetime";
import { displayError } from "@/utils/error";
import { Feather } from "@expo/vector-icons";
import { addHours, addMinutes, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import KeyboardWrapper from "../Basics/KeyboardWrapper";
import DatePicker from "../DatePicker";
import InputField from "../InputField";
import MultipleSelect from "../MultipleSelect";

const BookingForm = ({ userId }: { userId: string }) => {
	const [price, setPrice] = useState("");
	const [service, setService] = useState<any>([]);
	const [list, setList] = useState<any>([]);
	const [duration, setDuration] = useState("");
	const [address, setAddress] = useState("");
	const [braiders, setBraiders] = useState<any>([]);
	const [selectedBraiders, setSelectedBraiders] = useState([]);
	const [dateTime, setDateTime] = useState("");
	const [load, setLoad] = useState(false);

	useEffect(() => {
		listServices();
	}, []);

	useEffect(() => {
		updateFields();
	}, [service]);

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
								value: `${s.subServiceId}`,
								label: s.name,
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
				service?.length > 0 ? service[0] : ""
			);
			if (Array.isArray(res)) {
				setBraiders(
					res.map((s: any) => {
						return {
							...s,
							value: `${s.userId}`,
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
		if (service?.length > 0) {
			let find = list.find((val: any) => val.subServiceId == service[0]);
			if (find) {
				setDuration(formatTime(find.duration));
				setPrice(`₦${Number(find.price) / 100}`);
			}
		}
	};

	const showDateTime = (val: any) => {
		if (val) {
			let timeDuration = list.find(
				(val: any) => val.subServiceId == service
			)?.duration;
			let valDate = new Date(val);
			let realDate = format(valDate, "yyyy/MM/dd HH:mm");
			let addTime;
			if (timeDuration < 60) {
				addTime = format(addMinutes(valDate, timeDuration), "HH:mm");
			} else {
				addTime = format(addHours(valDate, timeDuration / 60), "HH:mm");
			}
			return `${realDate} - ${addTime}`;
		} else {
			return "";
		}
	};

	const submitHandler = async () => {
		try {
			let payload = {
				assignedProId: Number(selectedBraiders[0]),
				subServiceIds: [Number(service)],
				pinDate: new Date(dateTime).toISOString(),
				userId: Number(userId),
				address,
				channel: "cash",
				assistantProIds: [Number(selectedBraiders[1])],
			};
			console.log(payload, "payloaxd");
			setLoad(true);
			await bookService.createBooking(payload);
			setLoad(false);
		} catch (err) {
			setLoad(false);
			console.log(err?.response?.data, "err");
			displayError(err, true);
		}
	};

	return (
		<View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
			<KeyboardWrapper>
				<MultipleSelect
					setValue={setService}
					value={service}
					data={list}
					label="Service"
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
				<MultipleSelect
					setValue={setSelectedBraiders}
					placeholder="Add Braiders"
					data={braiders}
					label="Add Braiders"
					isLight={true}
					value={selectedBraiders}
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
							<Feather name="plus" color={"#FFF"} size={20} />
							<Text
								style={[
									textStyles.textMid,
									{ marginLeft: 10, color: "#FFF" },
								]}
							>
								Add Booking
							</Text>
						</>
					)}
				</TouchableOpacity>
			</KeyboardWrapper>
		</View>
	);
};

export default BookingForm;
