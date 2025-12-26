import { createSlice } from "@reduxjs/toolkit";
import type { TClient, TLoading } from "../../types/types";
import thunkGetAllClients from "./thunk/thunkGetAllclients";

type TInitialState = {
    clients: TClient[];
    pageNumber: number;
    totalRecords: number;
    totalPages: number;
    loading: TLoading;
    error: string | null;
}

const initialState: TInitialState = {
    clients: [],
    pageNumber: 1,
    totalRecords: 0,
    totalPages: 0,
    loading: 'idle',
    error: null,
}

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(thunkGetAllClients.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetAllClients.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.clients = action.payload.data;
                state.pageNumber = action.payload.pageNumber;
                state.totalRecords = action.payload.totalRecords
            })
    },
});

export default clientsSlice.reducer;