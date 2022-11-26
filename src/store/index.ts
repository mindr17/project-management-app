import { configureStore } from '@reduxjs/toolkit';
import sliceAuth from './auth/sliceAuth';
import sliceBoards from './boards/sliceBoards';


const store = configureStore({
  reducer: {
    auth: sliceAuth,
    boards: sliceBoards,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
