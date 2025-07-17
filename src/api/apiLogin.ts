import axios from "axios";
import type { LoginForm } from "../types/LoginForm";
import type { ApiResponse } from "../types/ApiResponse";
import type { TokenResponse } from "../types/RegisterResponse";

export default function apiLogin(loginForm: LoginForm) {
    const sendRequest = async (): Promise<ApiResponse<TokenResponse>> => {
        try {
            const link = "http://localhost:8080/api/v1/auth/authenticate/";
            const response = await axios.post(link, loginForm);

            return {
                status: "SUCCESS",
                data: response.data
            }
        }
        catch(e) {
            if (axios.isAxiosError(e)) {
                return {
                    status: "ERROR",
                    data: e.response?.data
                }
            }

            else{
                return {
                    status: "UNEXPECTED_ERROR",
                    data: e
                }
            }
        }
    }

    return sendRequest();
}


