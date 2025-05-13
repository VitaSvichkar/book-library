import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedBook: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.selectedBook = action.payload;
    },
    closeModal: (state) => {
      state.selectedBook = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export function getSelectedBook(state) {
  return state.modal.selectedBook;
}
export default modalSlice;
