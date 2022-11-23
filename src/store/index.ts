import { configureStore } from '@reduxjs/toolkit';
import sliceAuth from './auth/sliceAuth';
import sliceModal from './modal/sliceModal';

const store = configureStore({
  reducer: {
    auth: sliceAuth,
    modal: sliceModal,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
