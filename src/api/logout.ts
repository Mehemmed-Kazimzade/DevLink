import axios from "axios";
import type { ApiResponse } from "../types/ApiResponse";
import type { TokenResponse } from "../types/RegisterResponse";

export default function logout(link: string, token: string) {
    const sendRequest = async (): Promise<ApiResponse<TokenResponse>> => {
        try {
            const response = await axios.post(link, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return {
                status: "SUCCESS",
                data: response.data,
            };

        } catch (e) {
            if (axios.isAxiosError(e)) {
                return {
                    status: "ERROR",
                    data: e.response?.data,
                };
            } else {
                return {
                    status: "UNEXPECTED_ERROR",
                    data: e,
                };
            }
        }
    };

    return sendRequest();
}