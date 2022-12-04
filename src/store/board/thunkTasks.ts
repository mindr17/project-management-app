import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config';
import { IKnownError } from '../auth/interfaceAuthStore';
import { IParamsBoardIdAndColumnId, ITask, ITaskListParams, ITaskParameters } from './Iboard';

export const getTasksInColumn = createAsyncThunk(
  'board/getTasksInColumn',
  async (data: IParamsBoardIdAndColumnId, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(
      `${BASE_URL}/boards/${data.boardId}/columns/${data.columnId}/tasks`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const allTasksInColumn: ITask[] = await response.json();

    return allTasksInColumn;
  }
);

export const createTask = createAsyncThunk(
  'board/createTask',
  async (data: ITaskParameters, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');   
    const response = await fetch(
      `${BASE_URL}/boards/${data.boardId}/columns/${data.columnId}/tasks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.newTaskParams),
      }
    );

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const allTasksInColumn: ITask = await response.json();

    return allTasksInColumn;
  }
);

export const getTaskById = createAsyncThunk(
  'board/getTaskById',
  async (data: ITaskParameters, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(
      `${BASE_URL}/boards/${data.boardId}/columns/${data.columnId}/tasks/${data.taskId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const foundedTask: ITask = await response.json();

    return foundedTask;
  }
);

export const updateTaskById = createAsyncThunk(
  'board/updateTaskById',
  async (data: ITaskParameters, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(
      `${BASE_URL}/boards/${data.boardId}/columns/${data.columnId}/tasks/${data.taskId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.newTaskParams),
      }
    );

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const updateTask: ITask = await response.json();

    return updateTask;
  }
);

export const deleteTaskById = createAsyncThunk(
  'board/deleteTaskById',
  async (data: ITaskParameters, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(
      `${BASE_URL}/boards/${data.boardId}/columns/${data.columnId}/tasks/${data.taskId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const deleteTask: ITask = await response.json();

    return deleteTask;
  }
);

export const updateSetOfTasks = createAsyncThunk(
  'board/updateSetOfTasks',
  async (data: ITaskListParams[], { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(`${BASE_URL}/tasksSet`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const updatedTasks: ITask[] = await response.json();

    return updatedTasks;
  }
);

export const GetTasksInSelectedBoard = createAsyncThunk(
  'board/GetTasksInSelectedBoard',
  async (boardId: string, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(`${BASE_URL}/tasksSet/${boardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const tasksList: ITask[] = await response.json();

    return tasksList;
  }
);
