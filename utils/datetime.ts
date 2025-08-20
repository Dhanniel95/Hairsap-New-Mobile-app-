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

export { formatChatDate };
