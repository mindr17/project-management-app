import { configureStore } from '@reduxjs/toolkit';
import sliceAuth from './sliceAuth';

const store = configureStore({
  reducer: {
    auth: sliceAuth,

  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispathc = typeof store.dispatch;
