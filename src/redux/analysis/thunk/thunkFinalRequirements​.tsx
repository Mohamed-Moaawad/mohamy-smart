import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const thunkFinalRequirements = createAsyncThunk('analysis/thunkFinalRequirements​', async ({ caseId }: { caseId: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await api.post(`SmartAnalysis/final-requirements`,
            {
                caseId,
            }
        );
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkFinalRequirements;