import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkAddNewCase from "./thunk/thunkAddNewCase";
import { isString } from "../../utils/guards";
import thunkGetAllCases from "./thunk/thunkGetAllCases";
import thunkGetSingleCase from "./thunk/thunkGetSingleCase";


type TCase = {
    id: number;
    title: string;
    number: string;
    type: string;
    court: string;
    clientName: string;
    apponentName: string;
    description: string;
    facts: string;
    legalClaims: string;
    status: number;
    creationDate: string;
};

type TSingleCaseD = {
    id: string;
    title: string;
    number: string;
    type: number;
    court: string;
    clientName: string;
    apponentName: string;
    description: string;
    facts: string;
    legalClaims: string;
    status: number;
    creationDate: string;
};


type TInitialState = {
    cases: TCase[];
    singleCase: TSingleCaseD | null;
    pageNumber: number;
    totalPages: number;
    totalRecords: number;
    loading: TLoading;
    error: string | null;
}

const initialState: TInitialState = {
    cases: [],
    singleCase: null,
    pageNumber: 1,
    totalPages: 1,
    totalRecords: 0,
    loading: 'idle',
    error: null,
}

const casesSlice = createSlice({
    name: 'cases',
    initialState,
    reducers: {
        setPageNumber(state, action) {
            state.pageNumber = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            //  Add New Case
            .addCase(thunkAddNewCase.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAddNewCase.fulfilled, (state) => {
                state.loading = 'succeeded';
                // state.cases.unshift(action.payload);
            })
            .addCase(thunkAddNewCase.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get All Cases
            .addCase(thunkGetAllCases.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
                state.cases = [];
            })
            .addCase(thunkGetAllCases.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.cases = action.payload.data;
                state.pageNumber = action.payload.pageNumber;
                state.totalPages = action.payload.totalPages;
                state.totalRecords = action.payload.totalRecords;
            })
            .addCase(thunkGetAllCases.rejected, (state, action) => {
                state.loading = 'failed';
                state.cases = [];
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get single Cases
            .addCase(thunkGetSingleCase.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetSingleCase.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.singleCase = action.payload;

            })
            .addCase(thunkGetSingleCase.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export const { setPageNumber } = casesSlice.actions;

export default casesSlice.reducer;