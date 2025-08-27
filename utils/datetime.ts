import {
	differenceInCalendarDays,
	format,
	isToday,
	isYesterday,
} from "date-fns";

const formatChatDate = (dateString: string) => {
	const date = new Date(dateString);

	if (isToday(date)) {
		// Show time if today
		return format(date, "h:mm a"); // e.g. "3:45 PM"
	}

	if (isYesterday(date)) {
		return "Yesterday";
	}

	const diff = differenceInCalendarDays(new Date(), date);

	if (diff < 7) {
		// Within last 6 days → show day of the week
		return format(date, "EEEE"); // e.g. "Thursday"
	}

	// Else show full date
	return format(date, "MMM d, yyyy"); // e.g. "Aug 10, 2025"
};

const formatTime = (value: any) => {
	if (value < 60) return `${value} mins`;

	let hours = value / 60;
	let mins = value % 60;

	return `${hours.toFixed(0)} hr${hours > 1 && "s"} ${
		mins !== 0 ? mins + " mins" : ""
	}`;
};

export { formatChatDate, formatTime };
