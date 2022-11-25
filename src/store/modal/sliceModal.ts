import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  activeModal: false,
};

const sliceModal = createSlice({
  name: 'modal',
  initialState,

  reducers: {
    isModal(state, action: PayloadAction<boolean>) {
      state.activeModal = action.payload;
    },
  },
});

export const { isModal } = sliceModal.actions;

export default sliceModal.reducer;
