import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteUser, getUserById, login, logout, registerUser, updateUser } from './authThunk';
import { IinitialStateAuth, IResponseUser } from './interfaceAuthStore';

const initialState: IinitialStateAuth = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  token: '',
  isDelete: false,
};

const sliceAuth = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    callReset(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
    setUser(state, action: PayloadAction<IResponseUser>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setIsDelete(state) {
      state.isDelete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;

        if (action.payload) {
          state.message = action.payload.message;
        } else {
          state.message = 'Error Server.';
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
        localStorage.setItem('token', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.message = action.payload.message;
        } else {
          state.message = 'Error Server.';
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = '';
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isDelete = true;
        state = initialState;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        if (action.payload) {
          state.message = action.payload.message;
        } else {
          state.message = 'Error Server.';
        }
      });
  },
});

export const { callReset, setUser, setToken, setIsDelete } = sliceAuth.actions;

export default sliceAuth.reducer;
