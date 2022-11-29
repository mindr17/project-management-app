import { configureStore } from '@reduxjs/toolkit';
import sliceAuth from './auth/sliceAuth';
import sliceBoards from './boards/sliceBoards';
import sliceBoard from './board/sliceBoard';

const store = configureStore({
  reducer: {
    auth: sliceAuth,
    boards: sliceBoards,
    board: sliceBoard,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
