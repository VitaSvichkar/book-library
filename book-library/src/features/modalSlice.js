import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    type: null,
    selectedBook: null,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      return {
        ...state,
        modal: {
          ...state.modal,
          type: action.payload.type,
          selectedBook: action.payload.book,
        },
      };
    },

    closeModal: (state) => {
      return {
        ...state,
        modal: {
          ...state.modal,
          type: null,
          selectedBook: null,
        },
      };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export function getStateModal(state) {
  return state.modal.modal;
}
export default modalSlice;
