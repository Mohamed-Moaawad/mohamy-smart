import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TPropsData = {
    caseId: string;
    legalAnalysisText: string;
}

const thunkGenerateDefenses = createAsyncThunk('analysis/thunkGenerateDefenses', async ({ caseId, legalAnalysisText }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await api.post(`SmartAnalysis/generate-defenses`, {
            caseId,
            legalAnalysisText,
        });
        return res.data.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    };
});

export default thunkGenerateDefenses;