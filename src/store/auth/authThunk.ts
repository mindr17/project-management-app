import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config';

interface IUpdateUser {
  token: string;
  id: string;
  formData: FormData;
}

export type ResCreateUser = {
  _id: string;
  name: string;
  login: string;
};

export type FormData = {
  name: string;
  login: string;
  password: string;
};

type CreateToken = {
  login: string;
  password: string;
};

export interface MyKnownError {
  message: string;
  statusCode: number;
}

export interface ITokenAndId {
  token: string;
  id: string;
}

export const registerUser = createAsyncThunk<
  ResCreateUser,
  FormData,
  { rejectValue: MyKnownError }
>('auth/registerUser', async (dataForm, { rejectWithValue }) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataForm),
  });

  if (!response.ok) {
    return rejectWithValue((await response.json()) as MyKnownError);
  }
  const user: ResCreateUser = await response.json();

  return user;
});

export const login = createAsyncThunk<string, CreateToken, { rejectValue: MyKnownError }>(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      return rejectWithValue((await response.json()) as MyKnownError);
    }
    const res = (await response.json()) as { token: string };
    return res.token;
  }
);

export const getUserById = createAsyncThunk<
  ResCreateUser,
  ITokenAndId,
  { rejectValue: MyKnownError }
>('auth/getUserById', async (tokenAndId, { rejectWithValue }) => {
  const response = await fetch(`${BASE_URL}/users/${tokenAndId.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAndId.token}`,
    },
  });

  if (!response.ok) {
    return rejectWithValue((await response.json()) as MyKnownError);
  }
  const user: ResCreateUser = await response.json();
  return user;
});

export const deleteUser = createAsyncThunk<
  ResCreateUser,
  ITokenAndId,
  { rejectValue: MyKnownError }
>('profile/deleteUser', async (tokenAndId, { rejectWithValue }) => {
  const response = await fetch(`${BASE_URL}/users/${tokenAndId.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAndId.token}`,
    },
  });

  if (!response.ok) {
    return rejectWithValue((await response.json()) as MyKnownError);
  }
  const user: ResCreateUser = await response.json();

  return user;
});

export const updateUser = createAsyncThunk<
  ResCreateUser,
  IUpdateUser,
  { rejectValue: MyKnownError }
>('profile/updateUser', async (data, { rejectWithValue }) => {
  const { formData, id, token } = data;
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    return rejectWithValue((await response.json()) as MyKnownError);
  }
  const updatedUserData: ResCreateUser = await response.json();

  return updatedUserData;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
});
