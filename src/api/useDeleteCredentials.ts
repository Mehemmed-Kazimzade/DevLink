import axios from "axios";
import type { ProfileResponse } from "../types/userProfileTypes/ProfileResponse";
import type { ApiResponse } from "../types/ApiResponse";

export default function useDeleteCredentials(link: string) {
    const sendRequest = async (): Promise<ApiResponse<ProfileResponse>> => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(link, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return {
                status: "SUCCESS",
                data: response.data,
            };
        } catch (e: any) {
            console.error("Error occurred: " + e);

            return {
                status: "ERROR",
                data: e.response.data ?? "Unexpected error occurred, refresh page and try again.",
            };
        }
    };

    return sendRequest();
}
