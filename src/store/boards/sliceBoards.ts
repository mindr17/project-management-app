import { createSlice } from '@reduxjs/toolkit';
import { getBoards, deleteBoard } from './boardsThunk';
import { IBoard } from './IBoard';



interface InitialStateBoards {
  boards: Array<IBoard>,
}

const initialState: InitialStateBoards = {
  boards: [],
}

const sliceBoards = createSlice({
  name: 'boards',
  initialState,

  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = [...state.boards.filter(x => x._id !== action.payload._id)];
      })
  }
})

export default sliceBoards.reducer;