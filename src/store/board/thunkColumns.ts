import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config';
import { IKnownError } from '../auth/interfaceAuthStore';
import {
  IBoardCreateColumn,
  IColumn,
  IListOfNewColumns,
  IListOfNewParams,
  IParamsBoardIdAndColumnId,
  IParamsUpdateColumnById,
} from './Iboard';

export const createColumnInBoard = createAsyncThunk(
  'board/CreateColumnInBoard',
  async (data: IBoardCreateColumn, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(`${BASE_URL}/boards/${data.boardId}/columns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data.newParams),
    });

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const column: IColumn = await response.json();

    return column;
  }
);

export const getColumnById = createAsyncThunk(
  'board/getColumnById',
  async (data: IParamsBoardIdAndColumnId, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(`${BASE_URL}/boards/${data.boardId}/columns/${data.columnId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const column: IColumn = await response.json();

    return column;
  }
);

export const updateColumnById = createAsyncThunk(
  'board/updateColumnById',
  async (data: IParamsUpdateColumnById, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(`${BASE_URL}/boards/${data.boardId}/columns/${data.columnId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data.newParams),
    });

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const updatedColumn: IColumn = await response.json();

    return updatedColumn;
  }
);

export const deleteColumnById = createAsyncThunk(
  'board/deleteColumnById',
  async (data: IParamsBoardIdAndColumnId, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(`${BASE_URL}/boards/${data.boardId}/columns/${data.columnId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const updatedColumn: IColumn = await response.json();

    return updatedColumn;
  }
);

export const getColumnByIdsListOrUserId = createAsyncThunk(
  'board/getColumnByIdsListOrUserId',
  async (userId: string, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(`${BASE_URL}/columnsSet`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const columnsList: IColumn[] = await response.json();

    return columnsList;
  }
);

export const updateSetOfColumns = createAsyncThunk(
  'board/updateSetOfColumns',
  async (data: IListOfNewParams, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(`${BASE_URL}/columnsSet`, {
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
    const updatedColumns: IColumn[] = await response.json();

    return updatedColumns;
  }
);

export const createSetOfColumns = createAsyncThunk(
  'board/createSetOfColumns',
  async (data: IListOfNewColumns, { rejectWithValue }) => {
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const response = await fetch(`${BASE_URL}/columnsSet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return rejectWithValue((await response.json()) as IKnownError);
    }
    const createdColumns: IColumn[] = await response.json();

    return createdColumns;
  }
);
