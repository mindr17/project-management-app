import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config';
import { IKnownError } from '../auth/interfaceAuthStore';
import { IColumn, ITask } from './Iboard';

export const GetBoardData = createAsyncThunk(
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

interface IBoardCreateColumn {
  boardId: string;
  newParams: {
    title: string;
    order: number;
  };
}

export const CreateColumnInBoard = createAsyncThunk(
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

interface IParamsGetColumnById {
  boardId: string;
  columnId: string;
}

export const getColumnById = createAsyncThunk(
  'board/getColumnById',
  async (data: IParamsGetColumnById, { rejectWithValue }) => {
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

interface IParamsUpdateColumnById {
  boardId: string;
  columnId: string;
  newParams: {
    title: string;
    order: number;
  };
}

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

//========================================

// export interface IResponseColumn {
//   _id: string;
//   title: string;
//   order: number;
//   boardId: string;
// }

// export interface IResponseTasks {
//   _id: string;
//   title: string;
//   order: number;
//   description: string;
//   userId: string;
//   boardId: string;
//   columnId: string;
//   users: string[];
// }

// export interface IResponse {
//   boaedData: IResponseColumn & IResponseTasks;
// }

// export const GetColumnsInBoard = createAsyncThunk<
//   IResponseColumn[],
//   string,
//   { rejectValue: IKnownError }
// >('board/GetColumnsInBoard', async (boardId, { rejectWithValue }) => {
//   const token: string = JSON.parse(localStorage.getItem('token') || '');
//   const response = await fetch(`${BASE_URL}/boards/${boardId}/columns`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     return rejectWithValue((await response.json()) as IKnownError);
//   }
//   const columns: IResponseColumn[] = await response.json();

//   return columns;
// });

// export const GetTasksInSelectedBoard = createAsyncThunk<
//   IResponseTasks[],
//   string,
//   { rejectValue: IKnownError }
// >('board/GetTasksInSelectedBoard', async (boardId, { rejectWithValue }) => {
//   const token: string = JSON.parse(localStorage.getItem('token') || '');
//   const response = await fetch(`${BASE_URL}/tasksSet/${boardId}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     return rejectWithValue((await response.json()) as IKnownError);
//   }
//   const tasks: IResponseTasks[] = await response.json();

//   return tasks;
// });
