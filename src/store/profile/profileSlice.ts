import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponsesAuth } from '../sliceAuth';
import { deleteUser, updateUser } from './profileThunk';

interface IinitialState {
  user: ResponsesAuth,
  isDelete: boolean;
  isLoading: boolean;
}

const initialState = {
  user: {},
  isDelete: false,
  isLoading: false,
} as IinitialState

const profileSlice = createSlice({
  name: 'profile',
  initialState,

  reducers: {
    setIsDelete(state) {
      state.isDelete = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isDelete = true
        console.log('User Delete');
        state = initialState
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
  },
});

export const { setIsDelete } = profileSlice.actions;

export default profileSlice.reducer;

