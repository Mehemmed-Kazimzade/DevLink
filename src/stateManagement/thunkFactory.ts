import { createAsyncThunk } from "@reduxjs/toolkit";
import useGetCredentials from "../api/useGetCredentials";

export default function createFetchThunk<T>(type: string, transform?: (data: any) => T) {
    return createAsyncThunk<T, string>(
        type,
        async (url, thunkAPI) => {
            const response = await useGetCredentials<T>(url);

            if(response.status === "SUCCESS") {
                const transformed = transform ? transform(response.data) : response.data;
                return transformed; 
            }
            else {
                return thunkAPI.rejectWithValue(response.data);
            }
        }
    )
}
