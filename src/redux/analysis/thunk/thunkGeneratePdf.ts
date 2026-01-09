import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const thunkGetSummary = createAsyncThunk('analysis/thunkGetSummary', async ({ caseId }: { caseId: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await api.get(`SmartAnalysis/summary/${caseId}`);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGetSummary;