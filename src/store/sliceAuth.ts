import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ResponsesAuth = {
  id?: string;
  name?: string;
  login?: string;
}

const sliceAuth = createSlice({
  name: 'auth',
  initialState: {
    responsesAuth: {} as ResponsesAuth,
    password: '',
    token: ''
  },

  reducers: {
    setResponsesAuth(state, action: PayloadAction<ResponsesAuth>) {
      state.responsesAuth = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
  },
});

export const {
setResponsesAuth,
  setToken,
} = sliceAuth.actions;

export default sliceAuth.reducer;
