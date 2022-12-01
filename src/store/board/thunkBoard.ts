import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config';
import { IKnownError } from '../auth/interfaceAuthStore';
import { IColumn, ITask } from './Iboard';

export const getBoardData = createAsyncThunk(
  'board/GetBoardData',
  async (boardId: string, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');

    const columnsPromise = fetch(`${BASE_URL}/boards/${boardId}/columns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const tasksPromise = fetch(`${BASE_URL}/tasksSet/${boardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const [responseColumns, responseTasks] = await Promise.all([columnsPromise, tasksPromise]);

    if (!responseColumns.ok) {
      return rejectWithValue((await responseColumns.json()) as IKnownError);
    }

    if (!responseTasks.ok) {
      return rejectWithValue((await responseTasks.json()) as IKnownError);
    }

    const columns: IColumn[] = await responseColumns.json();
    const tasks: ITask[] = await responseTasks.json();

    return { columns, tasks };
  }
);
