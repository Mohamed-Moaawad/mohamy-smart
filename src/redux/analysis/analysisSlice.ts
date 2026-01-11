import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkFactAnalysis from "./thunk/thunkFactAnalysis";
import { isString } from "../../utils/guards";
import thunkGenerateDefenses from "./thunk/thunkGenerateDefenses";
import thunkAnalysisDefense from "./thunk/thunkAnalysisDefense";
import thunkFinalRequirements from "./thunk/thunkFinalRequirements​";
import thunkGetSummary from "./thunk/thunkGeneratePdf";

type TDefense = {
    id: string;
    defenseTitle: string;
    basisFromCase: string;
    scope: string;
    strength: "Strong" | "Medium" | "Weak";
};
type TDefenses = {
    defensesFormal: TDefense[];
    defensesSubstantive: TDefense[];
    defensesEvidentiary: TDefense[];
}

type TFactAnalysis = {
    caseType: string;
    caseNumber: string;
    courtName: string;
    legalFactsSummary: string[];
    defendantsPositions: {
        defendantName: string;
        positionSummary: string;
    }[];
    evidenceMap: {
        source: string;
        proves: string;
        doesNotProve: string;
        limitations: string;
    }[];
    legalAndTechnicalReviewPoints: string[];
    potentialLegalCharacterization: {
        chargeDescription: string;
        elementsReliedUpon: string[];
        elementsLackingProof: string[];
    };
}
type TFinalRequirements = {
    id: string;
    requestLevel: string;
    requestText: string;
}

type TAnalysisState = {
    factAnalysis: TFactAnalysis | null;
    defenses: TDefenses | null;
    analysisDefenses: { memorandumText: string } | null;
    finalRequirements: TFinalRequirements[];
    summary: {
        caseId: string;
        caseNumber: string;
        caseType: string;
        courtName: string;
        clientName: string;
        apponentName: string;

        factAnalysis: TFactAnalysis;
        defenses: TDefenses;
        finalRequirements: {
            finalPrayers: TFinalRequirements[];
        };
    } | null;
    loading: TLoading;
    error: string | null;
}

const initialState: TAnalysisState = {
    factAnalysis: null,
    defenses: null,
    analysisDefenses: null,
    finalRequirements: [],
    summary: null,
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
                state.finalRequirements = action.payload.finalPrayers;
            })
            .addCase(thunkFinalRequirements.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get Summary
            .addCase(thunkGetSummary.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetSummary.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.summary = action.payload;
            })
            .addCase(thunkGetSummary.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});


export default analysisSlice.reducer;