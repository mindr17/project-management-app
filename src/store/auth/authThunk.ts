import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config';
import {
  ICreateToken,
  IFormData,
  IKnownError,
  IResponseUser,
  IResponseUserAndToken,
  ITokenAndId,
  IUpdateUser,
} from './interfaceAuthStore';

export const signUpAndSignIn = createAsyncThunk<
  IResponseUserAndToken,
  IFormData,
  { rejectValue: IKnownError }
>('auth/signUpAndSignIn', async (dataForm: IFormData, { rejectWithValue }) => {
  const { login, password } = dataForm;

  const responseSignUp = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataForm),
  });

  if (!responseSignUp.ok) {
    return rejectWithValue(await responseSignUp.json());
  }

  const user: IResponseUser = await responseSignUp.json();

  const responseSignIn = await fetch(`${BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });

  if (!responseSignIn.ok) {
    return rejectWithValue(await responseSignIn.json());
  }

  const token: { token: string } = await responseSignIn.json();

  return { user, token };
});

export const login = createAsyncThunk<string, ICreateToken, { rejectValue: IKnownError }>(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      return rejectWithValue(await response.json());
    }
    const res: { token: string } = await response.json();

    return res.token;
  }
);

export const getUserById = createAsyncThunk<
  IResponseUser,
  ITokenAndId,
  { rejectValue: IKnownError }
>('auth/getUserById', async (tokenAndId, { rejectWithValue }) => {
  const response = await fetch(`${BASE_URL}/users/${tokenAndId.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAndId.token}`,
    },
  });

  if (!response.ok) {
    return rejectWithValue(await response.json());
  }
  const user: IResponseUser = await response.json();

  return user;
});

export const deleteUser = createAsyncThunk<
  IResponseUser,
  ITokenAndId,
  { rejectValue: IKnownError }
>('profile/deleteUser', async (tokenAndId, { rejectWithValue }) => {
  const response = await fetch(`${BASE_URL}/users/${tokenAndId.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAndId.token}`,
    },
  });

  if (!response.ok) {
    return rejectWithValue(await response.json());
  }
  const user: IResponseUser = await response.json();

  return user;
});

export const updateUser = createAsyncThunk<
  IResponseUser,
  IUpdateUser,
  { rejectValue: IKnownError }
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
    return rejectWithValue(await response.json());
  }
  const updatedUserData: IResponseUser = await response.json();

  return updatedUserData;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('exp');
});
