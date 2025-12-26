import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const thunkOcrExtract = createAsyncThunk('ocr/thunkOcrExtract', async (file: File, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const formData = new FormData();
        formData.append('Images', file);

        const res = await api.post('/Ocr/ocr', formData);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkOcrExtract;