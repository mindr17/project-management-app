import { createAsyncThunk } from "@reduxjs/toolkit"
import { IFormSignUp } from "../../components/auth/UserProfile";
import { BASE_URL } from "../../config"
import { ITokenAndId, MyKnownError, ResCreateUser } from "../thunk"

interface IUpdateUser {
  token: string;
  id: string;
  formData: IFormSignUp
}

export const deleteUser = createAsyncThunk<ResCreateUser, ITokenAndId, { rejectValue: MyKnownError }>(
  'profile/deleteUser',
  async (tokenAndId, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/users/${tokenAndId.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenAndId.token}`
      },
    })

    if (!response.ok) {
      return rejectWithValue((await response.json()) as MyKnownError)
    }
    const user: ResCreateUser = await response.json()

    return user
  }
)

export const updateUser = createAsyncThunk<ResCreateUser, IUpdateUser, { rejectValue: MyKnownError }>(
  'profile/updateUser',
  async (data, { rejectWithValue }) => {
    console.log('data', data);

    const { formData, id, token } = data
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
    console.log(response);

    if (!response.ok) {
      return rejectWithValue((await response.json()) as MyKnownError)
    }
    const user: ResCreateUser = await response.json()

    return user
  }
)