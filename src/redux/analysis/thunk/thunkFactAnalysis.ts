import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TProps = {
    caseId: string;
    caseFacts: string;
}

const thunkFactAnalysis = createAsyncThunk('analysis/thunkFactAnalysis', async ({ caseId, caseFacts }: TProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await api.post(`SmartAnalysis/legal-analysis`,
            {
                caseId,
                caseFacts
            }
        );
        const parsedData =
            typeof res.data.data === "string"
                ? JSON.parse(res.data.data)
                : res.data.data;

        return parsedData;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkFactAnalysis;