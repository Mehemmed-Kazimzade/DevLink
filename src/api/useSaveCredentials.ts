import axios from "axios";
import type { CredentialDataType } from "../types/userProfileTypes/CredentialDataType";
import type { ProfileResponse } from "../types/userProfileTypes/ProfileResponse";
import type { ApiResponse } from "../types/ApiResponse";

export default function useUpdateCredentials(data: CredentialDataType, link: string) {
    const sendRequest = async (): Promise<ApiResponse<ProfileResponse>> => {
        try {
            const response = await axios.put(link, data);
            return {
                status: "SUCCESS",
                data: response.data,
            }
        }
        catch(e) {
            console.log("Error occurred: " + e);
            return {
                status: "ERROR",
                data: "Unexpected error occurred, refresh page and try again."
            }
        }
    }

    return sendRequest();
}