import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../components/server/server';


type ResCreateUser = {
  id: string;
  name: string;
  login: string;
}

type FormData = {
  name: string;
  login: string;
  password: string;
}

type CreateToken = {
  login: string;
  password: string;
}

interface MyKnownError {
  message: string;
  statusCode: number;

}

export const registerUser = createAsyncThunk<ResCreateUser, FormData, { rejectValue: MyKnownError }>(
  'auth/registerUser',
  async (dataSignIn, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataSignIn),
    })

    if (!response.ok) {
      return rejectWithValue((await response.json()) as MyKnownError)
    }

    return (await response.json()) as ResCreateUser
  }
)

export const login = createAsyncThunk<string, CreateToken, { rejectValue: MyKnownError }>(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (!response.ok) {
      return rejectWithValue((await response.json()) as MyKnownError)
    }
    const res = await response.json() as { token: string }

    return res.token;
  }
)

// export const logout = createAsyncThunk('auth/logout', async () => {
//   localStorage.removeItem('user')
//   // logoutTest()
// })

