import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import api from "../../../APIs/api";
import type { TUser } from "../../../types/types";

type TLoginResponse = {
    statusCode: number;
    meta: null;
    succeeded: boolean;
    message: string | null;
    errors: string[];
    data: TUser;
}

const thunkAuthLogin = createAsyncThunk('auth/thunkAuthLogin', async (data: { phone: string, password: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const formData = new FormData();
        formData.append('PhoneNumber', data.phone);
        formData.append('Password', data.password);

        const res = await api.post<TLoginResponse>('/Auth/login', formData);

        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});


export default thunkAuthLogin;