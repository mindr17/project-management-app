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
}) 