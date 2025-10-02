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

const formatTime = (value: number) => {
	if (value < 60) return `${value} min${value !== 1 ? "s" : ""}`;

	const hours = Math.floor(value / 60);
	const mins = value % 60;

	return `${hours} hr${hours !== 1 ? "s" : ""}${
		mins ? ` ${mins} min${mins !== 1 ? "s" : ""}` : ""
	}`;
};

export { formatChatDate, formatTime };
