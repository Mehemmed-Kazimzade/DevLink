import axios from "axios";
import type { ApiResponse } from "../types/ApiResponse";

export default function useGetCredentials<T>(link: string) {
    const sendRequest = async (): Promise<ApiResponse<T>> => {
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
                data: response.data as T,
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