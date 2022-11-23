import { createSlice } from '@reduxjs/toolkit';
import { getBoards } from './boardsThunk';
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
  }
})

export default sliceBoards.reducer;