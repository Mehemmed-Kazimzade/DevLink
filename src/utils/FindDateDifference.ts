import { DAY, HOUR, MINUTE, MONTH, WEEK, YEAR } from "../constants/DatesInMilliseconds";


export default function FindDateDifference(date: number) {
    const diff = new Date().getTime() - date;

    if (diff < MINUTE) return "less than a minute ago";

    if (diff < HOUR) {
        const minutes = Math.floor(diff / MINUTE);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    if (diff < DAY) {
        const hours = Math.floor(diff / HOUR);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    if (diff < WEEK) {
        const days = Math.floor(diff / DAY);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    if (diff < MONTH) {
        const weeks = Math.floor(diff / WEEK);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }

    if (diff < YEAR) {
        const months = Math.floor(diff / MONTH);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }

    const years = Math.floor(diff / YEAR);
    return `${years} year${years > 1 ? 's' : ''} ago`;
}