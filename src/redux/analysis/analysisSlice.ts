import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkFactAnalysis from "./thunk/thunkFactAnalysis";
import { isString } from "../../utils/guards";
import thunkGenerateDefenses from "./thunk/thunkGenerateDefenses";

type TDefenses = {
    proceduralDefenses: string[];
    substantiveDefenses: string[];
    evidentiaryDefenses: string[];
}

type TAnalysisState = {
    factAnalysis: {
        title: string;
        number: string;
        type: "جنحة" | "جناية" | "مخالفة";
        court: string;
        clientName: string;
        apponentName: string;
        description: string;
        facts: string;
        legalClaims: string;
    } | null;
    defenses: TDefenses | null;
    loading: TLoading;
    error: string | null;
}

const initialState: TAnalysisState = {
    factAnalysis: null,
    defenses: null,
    loading: 'idle',
    error: null,
};

const analysisSlice = createSlice({
    name: 'analysis',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Fact Analysis
            .addCase(thunkFactAnalysis.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkFactAnalysis.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.factAnalysis = action.payload;
            })
            .addCase(thunkFactAnalysis.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Generate Defenses
            .addCase(thunkGenerateDefenses.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGenerateDefenses.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.defenses = action.payload;
            })
            .addCase(thunkGenerateDefenses.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});


export default analysisSlice.reducer;