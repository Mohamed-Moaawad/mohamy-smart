import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../APIs/api";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TCaseData = {
    caseTitle: string;
    caseNumber: string;
    caseType: number;
    court: string;
    clientName: string;
    opponentName: string;
    caseDescription: string;
    caseFacts: string;
    legalRequests: string;
};

const thunkAddNewCase = createAsyncThunk('cases/thunkAddNewCase', async (data: TCaseData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await api.post('/Case/create', null, {
            params: {
                Title: data.caseTitle,
                Number: data.caseNumber,
                Type: data.caseType,
                Court: data.court,
                ClientName: data.clientName,
                ApponentName: data.opponentName,
                Description: data.caseDescription,
                Facts: data.caseFacts,
                LegalClaims: data.legalRequests,
            },
        });
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAddNewCase;