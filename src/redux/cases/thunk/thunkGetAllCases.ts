import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TParams = {
    pageNumber: number;
    pageSize: number;
    lawyerId: string | undefined;
}


const thunkGetAllCases = createAsyncThunk('cases/thunkGetAllCases', async ({ pageNumber, pageSize, lawyerId }: TParams, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {

        const res = await api.get('/Case', {
            params: {
                pageNumber,
                pageSize,
                lawyerId,
            }
        });
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGetAllCases;