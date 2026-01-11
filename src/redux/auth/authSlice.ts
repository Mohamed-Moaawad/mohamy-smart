import { createSlice } from "@reduxjs/toolkit";
import type { TLoading, TUser } from "../../types/types";
import thunkAuthRegister from "./thunk/thunkAuthRegister";
import { isString } from "../../utils/guards";
import thunkAuthLogin from "./thunk/thunkAuthLogin";


type TInitialState = {
    user: TUser | null,
    token: string | null,
    loading: TLoading,
    error: string | null,
}

const savedUser = localStorage.getItem('user');
const accessToken = localStorage.getItem('accessToken');

const initialState: TInitialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: accessToken || null,
    loading: 'idle',
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.loading = 'idle';
            state.error = null;
            localStorage.removeItem('user');
        }
    },
    extraReducers(builder) {
        builder
            // Register
            .addCase(thunkAuthRegister.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAuthRegister.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.user = action.payload;
            })
            .addCase(thunkAuthRegister.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Login
            .addCase(thunkAuthLogin.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAuthLogin.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                const userData = {
                    userId: action.payload.userId,
                    fullName: action.payload.fullName,
                    profileId: action.payload.profileId,
                    roles: action.payload.roles,
                    phone: action.payload.phone,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                };

                state.user = userData;

                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('accessToken', userData.accessToken);
                localStorage.setItem('refreshToken', userData.refreshToken);
            })
            .addCase(thunkAuthLogin.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })

    },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;