import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBoardData } from './thunkBoard';
import { createColumnInBoard, updateColumnById } from './thunkColumns';
import { IColumn, InitialState } from './Iboard';
import { createTask } from './thunkTasks';

const initialState: InitialState = {
  columns: [],
  tasks: [],
  isLoading: false,
};

const sliceBoard = createSlice({
  name: 'board',
  initialState,

  reducers: {
    updateColumns(state, action: PayloadAction<IColumn[]>) {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoardData.fulfilled, (state, action) => {
        state.columns = action.payload.columns.sort((a, b) => {
          return a.order - b.order;
        });
        state.tasks = action.payload.tasks;
        state.columns.forEach((column) => {
          column.tasks = action.payload.tasks
            .filter((task) => task.columnId === column._id)
            .sort((a, b) => {
              return a.order - b.order;
            });
        });
        state.isLoading = false;
      })
      .addCase(getBoardData.rejected, (state) => {
        state.isLoading = false;
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
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { columnId } = action.payload;
        state.columns.forEach((c) => {
          if (!c.tasks) {
            c.tasks = [];
          }
        });
        state.columns.find((c) => c._id == columnId)?.tasks.push(action.payload);
      });
  },
});

export const { updateColumns } = sliceBoard.actions;

export default sliceBoard.reducer;
