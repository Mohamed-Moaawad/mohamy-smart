import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const thunkGenerateCase = createAsyncThunk('ocr/thunkGenerateCase', async (revisedText: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const formData = new FormData();
        formData.append("revisedText", revisedText);

        const res = await api.post('/Ocr/generate-case', formData);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGenerateCase;