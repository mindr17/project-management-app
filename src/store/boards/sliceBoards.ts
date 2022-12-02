import { createSlice } from '@reduxjs/toolkit';
import { getBoards, deleteBoard, createBoard } from './boardsThunk';
import { IBoard } from './IBoard';

interface InitialStateBoards {
  boards: Array<IBoard>;
  isLoading: boolean;
}

const initialState: InitialStateBoards = {
  boards: [],
  isLoading: false,
};

const sliceBoards = createSlice({
  name: 'boards',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = [...state.boards.filter((x) => x._id !== action.payload._id)];
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      });
  },
});

export default sliceBoards.reducer;
