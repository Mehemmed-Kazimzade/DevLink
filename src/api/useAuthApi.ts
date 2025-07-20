import axios from "axios";
import type { ApiResponse } from "../types/ApiResponse";
import type { TokenResponse } from "../types/RegisterResponse";
import type { AuthForm } from "../types/authTypes/AuthForm";

export default function useAuthApi(formData: AuthForm, link: string) {
    const sendRequest = async (): Promise<ApiResponse<TokenResponse>> => {
        try {
            const response = await axios.post(link, formData, { withCredentials: true });
            return {
                status: "SUCCESS",
                data: response.data,
            }
        } catch(e) {
            if (axios.isAxiosError(e)) {
                return {
                    status: "ERROR",
                    data: e.response?.data,
                }
            }
            else{
                return {
                    status: "UNEXPECTED_ERROR",
                    data: e,
                }
            }
        }
    }

    return sendRequest();
}