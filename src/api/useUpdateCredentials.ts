import axios from "axios";
import type { ProfileResponse } from "../types/userProfileTypes/ProfileResponse";
import type { ApiResponse } from "../types/ApiResponse";

export default function useUpdateCredentials(data: any, link: string) {
    const sendRequest = async (): Promise<ApiResponse<ProfileResponse>> => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(link, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            return {
                status: "SUCCESS",
                data: response.data,
            }
        }
        catch(e) {
            console.error("Error occurred: " + e);

            return {
                status: "ERROR",
                data: "Unexpected error occurred, refresh page and try again."
            }
        }
    }

    return sendRequest();
}