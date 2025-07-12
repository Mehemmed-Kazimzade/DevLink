import axios from "axios";
import type { RegisterForm } from "../types/RegisterForm";
import type { ApiResponse } from "../types/ApiResponse";
import type { RegisterResponse } from "../types/RegisterResponse";

export default function apiRegister(registerForm: RegisterForm) {
    const sendData = async (): Promise<ApiResponse<RegisterResponse>> => {
        try {
            const link = "http://localhost:8080/api/v1/auth/register/";
            const res = await axios.post(link, registerForm);
            
            return {
                status: "SUCCESS",
                data: res.data,
            }
        }
        catch(e) {
            if (axios.isAxiosError(e)){
                return {
                    status: "ERROR",
                    data: e.response?.data,
                };
            }
            else{
                console.error("Unexpected error", e);
                return {
                    status: "UNEXPECTED_ERROR",
                    data: e,
                }
            }
        }
    }

    return sendData();
}