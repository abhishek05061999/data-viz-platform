import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import variablesReducer from './slices/variablesSlice';
import dataReducer from './slices/dataSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    variables: variablesReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;