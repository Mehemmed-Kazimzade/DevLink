import axios from "axios";
import type { ApiResponse } from "../types/ApiResponse";
import type { QuestionResponse } from "../types/questions";

export default function getQuestions(by: string) {
    const fetchQuestions = async (): Promise<ApiResponse<QuestionResponse>> => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/question/getQuestions/${by}`);
            
            return {
                status: "SUCCESS",
                data: response.data
            }
        }

        catch(e: any) {
            console.log(e);
            return {
                status: "ERROR",
                data: e.response.data ?? "Unexpected error occurred, refresh page and try again."
            }
        }
    }

    return fetchQuestions();
}