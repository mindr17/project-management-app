import { configureStore } from '@reduxjs/toolkit';
import sliceAuth from './auth/sliceAuth';
import sliceBoard from './board/sliceBoard';

const store = configureStore({
  reducer: {
    auth: sliceAuth,
    board: sliceBoard,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
