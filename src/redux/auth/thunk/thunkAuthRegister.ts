import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import type { TUser } from "../../../types/types";

type TRegisterResponse = {
    statusCode: number;
    meta: null;
    succeeded: boolean;
    message: string | null;
    errors: string[];
    data: TUser;
};

const thunkAuthRegister = createAsyncThunk<
    TUser | null,
    { fullName: string; phoneNumber: string; password: string }
>('auth/thunkAuthRegister', async (data, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;

    try {
        const formData = new FormData();
        formData.append("FullName", data.fullName);
        formData.append("PhoneNumber", data.phoneNumber);
        formData.append("Password", data.password);


        const res = await api.post<TRegisterResponse>('/Auth/register', formData);
        return res.data.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
});

export default thunkAuthRegister;