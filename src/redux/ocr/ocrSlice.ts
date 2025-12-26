import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkOcrExtract from "./thunk/thunkOcrExtract";
import { isString } from "../../utils/guards";
import thunkGenerateCase from "./thunk/thunkGenerateCase";

type TCaseData = {
    title: string;
    number: string;
    type: number;
    court: string;
    clientName: string;
    opponentName: string;
    description: string;
    facts: string;
    legalClaims: string;
} | null;

type TInitialState = {
    image: string[],
    extractedText: string | null;
    generatedCase: TCaseData | null,
    loading: TLoading,
    error: string | null,
}


const initialState: TInitialState = {
    image: [],
    extractedText: null,
    generatedCase: null,
    loading: 'idle',
    error: null,
}


const ocrSlice = createSlice({
    name: 'ocr',
    initialState,
    reducers: {
        setImage: (state, action) => {
            state.image = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            // thunkOcrExtract
            .addCase(thunkOcrExtract.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkOcrExtract.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.extractedText = action.payload
            })
            .addCase(thunkOcrExtract.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // thunkGenerateCase
            .addCase(thunkGenerateCase.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGenerateCase.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.generatedCase = action.payload
            })
            .addCase(thunkGenerateCase.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export const { setImage } = ocrSlice.actions;

export default ocrSlice.reducer;