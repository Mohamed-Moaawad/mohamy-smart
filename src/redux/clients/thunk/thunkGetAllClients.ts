import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import type { TClient } from "../../../types/types";

type TResponse = {
    statusCode: number;
    meta: null;
    succeeded: boolean;
    message: string;
    errors: string[];
    data: {
        data: TClient[];
        pageNumber: number;
        pageSize: number;
        totalRecords: number;
        totalPages: number;
    };
};

const thunkGetAllClients = createAsyncThunk('clients/thunkGetAllClients', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await api.get<TResponse>('/Account/users');
        return res.data.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGetAllClients;