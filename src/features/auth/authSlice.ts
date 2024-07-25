import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types/Types';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    user_id: null,
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserLogins(state, action: PayloadAction<{ user: any, token: string }>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('userRole', 'user');
        },
        clearUserLogins(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('userRole');
        },
        setAdminLogins(state, action: PayloadAction<{ user: any, token: string }>) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('userRole', 'admin');
        },
        clearAdminLogins(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('userRole');
        }
    }
});

export const { setUserLogins, clearUserLogins, setAdminLogins, clearAdminLogins } = authSlice.actions;
export default authSlice.reducer;
