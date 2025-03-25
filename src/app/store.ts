// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../features/api/usersApi';
import authReducer from '../features/auth/authSlice';
import { bookingApi } from '../features/api/bookingApi';
import { vehiclesApi } from '../features/api/vehiclesApi';
import { paymentApi } from '../features/api/paymentApi';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { ticketsApi } from '../features/api/ticketsApi';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated', ],
};


const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(usersApi.middleware,bookingApi.middleware,vehiclesApi.middleware,paymentApi.middleware,ticketsApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
