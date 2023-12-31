import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";
import type { RootState } from "../../app/store";

type AuthState = {
    user: User | null;
    token: string | null;
};

const slice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        isAuthenticated: null,
    } as AuthState,
    reducers: {
        setCredentials: (
            state,
            {
                payload: { user, accessToken, isAuthenticated },
            }: PayloadAction<{
                user: User;
                accessToken: string;
                isAuthenticated: boolean;
            }>
        ) => {
            state.user = user;
            state.token = accessToken;
        },
    },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
