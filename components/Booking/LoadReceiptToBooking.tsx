import bookService from "@/redux/book/bookService";
import colors from "@/utils/colors";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import ModalComponent from "../ModalComponent";
import BookingForm from "./BookingForm";

const LoadReceiptToBooking = ({
	open,
	close,
	id,
}: {
	open: boolean;
	close: () => void;
	id: number;
}) => {
	const [load, setLoad] = useState(false);
	const [bookingData, setBookingData] = useState<any>({});

	useEffect(() => {
		loadBookingInfo();
	}, []);

	const loadBookingInfo = async () => {
		try {
			setLoad(true);
			let res = await bookService.loadBookingData(id);
			if (res?.user) {
				setBookingData(res);
			}
			setLoad(false);
		} catch (err) {
			setLoad(false);
		}
	};

	return (
		<ModalComponent
			open={open}
			closeModal={close}
			centered
			bg="#334155"
			onlyCancel={true}
		>
			{load ? (
				<View>
					<ActivityIndicator color={colors.primary} />
				</View>
			) : bookingData.bookingId ? (
				<BookingForm
					userId={bookingData.user?.userId}
					onClose={close}
					detail={bookingData}
				/>
			) : (
				<></>
			)}
		</ModalComponent>
	);
};

export default LoadReceiptToBooking;
