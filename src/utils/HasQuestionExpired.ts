import { MINUTE } from "../constants/DatesInMilliseconds";

export default function HasQuestionExpired(lastFetched: number | null) {
    if (!lastFetched) return true;
    return Date.now() - lastFetched > MINUTE;
}