import { configureStore } from '@reduxjs/toolkit';
import { Reducers } from './redux/reducer';

export const store = configureStore({
  reducer: Reducers,
  devTools: process.env.NODE_ENV !== 'production',
});

export type Tstore = ReturnType<typeof store.getState>;
