import { createSlice} from '@reduxjs/toolkit';
import { ResponsesAuth } from '../auth/sliceAuth';
import { deleteUser, updateUser } from './profileThunk';

interface IinitialState {
  updatedUserData: ResponsesAuth | null,
  isDelete: boolean;
  isLoading: boolean;
  isError: boolean,
  message: string;
}

const initialState = {
  updatedUserData: null,
  isDelete: false,
  isLoading: false,
  isError: false,
  message: '',
} as IinitialState

const profileSlice = createSlice({
  name: 'profile',
  initialState,

  reducers: {
    setIsDelete(state) {
      state.isDelete = false
    },
    resetUpdateData(state) {
      state.updatedUserData = null
      state.isError = false
      state.message = '';
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
        state = initialState
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.updatedUserData = action.payload
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
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

export const { setIsDelete, resetUpdateData } = profileSlice.actions;

export default profileSlice.reducer;

