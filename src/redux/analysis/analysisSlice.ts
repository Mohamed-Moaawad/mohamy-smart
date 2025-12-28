import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkFactAnalysis from "./thunk/thunkFactAnalysis";
import { isString } from "../../utils/guards";
import thunkGenerateDefenses from "./thunk/thunkGenerateDefenses";
import thunkAnalysisDefense from "./thunk/thunkAnalysisDefense";
import thunkFinalRequirements from "./thunk/thunkFinalRequirements​";
import thunkGeneratePdf from "./thunk/thunkGeneratePdf";

type TDefenses = {
    proceduralDefenses: string[];
    substantiveDefenses: string[];
    evidentiaryDefenses: string[];
}

type TAnalysisState = {
    factAnalysis: string | null;
    defenses: TDefenses | null;
    analysisDefenses: { memorandumText: string } | null;
    finalRequirements: {
        finalRequirements: string[] | []
    } | null;
    // generatePdf: Blob | null;
    loading: TLoading;
    error: string | null;
}

const initialState: TAnalysisState = {
    factAnalysis: null,
    defenses: null,
    analysisDefenses: null,
    finalRequirements: null,
    // generatePdf: null,
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
            // Analysis Defenses
            .addCase(thunkAnalysisDefense.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAnalysisDefense.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.analysisDefenses = action.payload;
            })
            .addCase(thunkAnalysisDefense.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // final requirements
            .addCase(thunkFinalRequirements.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkFinalRequirements.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.finalRequirements = action.payload;
            })
            .addCase(thunkFinalRequirements.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Generate Pdf
            .addCase(thunkGeneratePdf.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGeneratePdf.fulfilled, (state) => {
                state.loading = 'succeeded';
                // state.generatePdf = action.payload;
            })
            .addCase(thunkGeneratePdf.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});


export default analysisSlice.reducer;