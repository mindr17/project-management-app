import { createSlice } from '@reduxjs/toolkit';
import { getBoardData } from './thunkBoard';
import { createColumnInBoard, updateColumnById } from './thunkColumns';
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
      .addCase(getBoardData.fulfilled, (state, action) => {
        state.columns = action.payload.columns;
        state.tasks = action.payload.tasks;
        state.columns.forEach((column) => {
          column.tasks = action.payload.tasks
            .filter((task) => task.columnId === column._id)
            .sort((a, b) => {
              return a.order - b.order;
            });
        });
      })
      .addCase(createColumnInBoard.fulfilled, (state, action) => {
        state.columns.push(action.payload);
      })
      .addCase(updateColumnById.fulfilled, (state, action) => {
        state.columns.forEach((column) => {
          if (column._id === action.payload._id) {
            column.title = action.payload.title;
            column.order = action.payload.order;
          }
        });
      });
  },
});

export const {} = sliceBoard.actions;

export default sliceBoard.reducer;
