import axios from "axios";
import type { ApiResponse } from "../types/ApiResponse";
import type { UserInfo } from "../types/userProfileTypes/UserInfo";

export default function useGetCredentials(link: string) {
    const sendRequest = async (): Promise<ApiResponse<UserInfo>> => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(link, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
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
                data: "",
            };
        }
    }

    return sendRequest();
}