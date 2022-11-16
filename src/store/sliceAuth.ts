import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { login, registerUser } from './thunk';

type ResponsesAuth = {
  id?: string;
  name?: string;
  login?: string;
}
interface IinitialState {
  user: ResponsesAuth | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;

  token: string;
  serverError: string | null;
  loading: string | null
}

// let user: ResponsesAuth | null = '' || {}
// if (typeof window !== 'undefined') {
//    user = JSON.parse(localStorage.getItem('user') || '')
// }
// const  user = JSON.parse(localStorage.getItem('user') || '')



const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',

  token: '',
  serverError: null,
} as IinitialState

const sliceAuth = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    callReset(state,) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        if (action.payload) {
          state.message = action.payload.message
        } else {
          state.message = 'Error Server.'
        }

      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.token = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        if (action.payload) {
          state.message = action.payload.message
        } else {
          state.message = 'Error Server.'
        }
      })
  },
});

export const {
  callReset,
} = sliceAuth.actions;

export default sliceAuth.reducer;
