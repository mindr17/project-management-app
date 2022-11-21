import { configureStore } from '@reduxjs/toolkit';
import sliceAuth from './auth/sliceAuth';
import profileSlice from './profile/profileSlice';

const store = configureStore({
  reducer: {
    auth: sliceAuth,
    profile: profileSlice

  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
