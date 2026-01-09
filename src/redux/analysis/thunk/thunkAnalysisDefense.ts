import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const thunkAnalysisDefense = createAsyncThunk('analysis/thunkAnalysisDefense', async ({ defenseId }: { defenseId: string; }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await api.post(`SmartAnalysis/analyze-defense`,
            {
                defenseId,
            }
        );
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAnalysisDefense;