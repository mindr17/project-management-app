import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config';
import { IBoard } from './IBoard';

export const getBoards = createAsyncThunk<Array<IBoard>>('boards/getBoards', async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const response = await fetch(`${BASE_URL}/boards`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  });
 
  return await response.json();
});

export interface IKnownError {
  message: string;
  statusCode: number;
}

export const deleteBoard = createAsyncThunk<
  IBoard,
  string,
  { rejectValue: IKnownError }
>('board/deleteBoard', async (id: string, { rejectWithValue }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  
  const response = await fetch(`${BASE_URL}/boards/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  });

  return await response.json();
});

interface IFormData {
  title: string;
  desc: string;
}

export const createBoard = createAsyncThunk<
  IBoard,
  IBoard,
  { rejectValue: IKnownError }
>('board/createBoard', async (data: IBoard, { rejectWithValue }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  
  const response = await fetch(`${BASE_URL}/boards/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  return await response.json();
});
