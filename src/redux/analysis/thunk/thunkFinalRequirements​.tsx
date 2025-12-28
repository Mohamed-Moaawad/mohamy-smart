import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


type TPropsData = {
    caseId: string;
    factsMap: string[];
    defensesMap: string[];
    optionalLegalReferences: string[] | null;
};


const thunkFinalRequirements = createAsyncThunk('analysis/thunkFinalRequirements​', async ({ caseId, defensesMap, factsMap, optionalLegalReferences }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await api.post(`SmartAnalysis/final-requirements`,
            {
                caseId,
                factsMap,
                defensesMap,
                optionalLegalReferences,
            }
        );

        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkFinalRequirements;