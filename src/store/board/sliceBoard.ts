import { createSlice } from '@reduxjs/toolkit';

import { CreateColumnInBoard, GetBoardData, updateColumnById } from './boardThunk';
import { InitialState } from './Iboard';

const initialState: InitialState = {
  columns: [],
  tasks: [],
};

const sliceBoard = createSlice({
  name: 'board',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetBoardData.fulfilled, (state, action) => {
        state.columns = action.payload.columns;

        state.tasks = action.payload.tasks;

        state.columns.forEach((column) => {
          column.tasks = action.payload.tasks.filter((task) => task.columnId === column._id);
        });
      })
      .addCase(CreateColumnInBoard.fulfilled, (state, action) => {
        state.columns.push(action.payload);
      })
      .addCase(updateColumnById.fulfilled, (state, action) => {
        state.columns.forEach((column) => {
          if (column._id === action.payload._id) {
            column = action.payload;
          }
        });
      });
  },
});

export const {} = sliceBoard.actions;

export default sliceBoard.reducer;
