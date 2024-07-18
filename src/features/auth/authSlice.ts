import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from '../../types/Types';

const initialState:AuthState = {
    isAuthenticated: false,
    user: null,
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserLogins(state, action: PayloadAction<{user: any, token: string}>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;            
        },
        clearUserLogins(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
        setUserRegister(state, action: PayloadAction<{user: any, token: string}>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;            
        },
        clearUserRegister(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
    }
});

export const { setUserLogins, clearUserLogins, setUserRegister,clearUserRegister } = authSlice.actions;
export default authSlice.reducer;