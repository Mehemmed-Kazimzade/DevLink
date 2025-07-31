import { createAsyncThunk } from "@reduxjs/toolkit";
import useGetCredentials from "../api/useGetCredentials";

export default function createFetchThunk<T>(type: string, url: string, transform?: (data: any) => T) {
    return createAsyncThunk(
        type,
        async (_, thunkAPI) => {
            const response = await useGetCredentials<T>(url);
            console.log(response.data);

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
