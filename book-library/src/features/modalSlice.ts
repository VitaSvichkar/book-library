import { RootState } from '../app/store';
import { Book } from './../types/book';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalTypes = 'CATALOG' | 'LIBRARY';

type InitValues = {
  modal: {
    type: ModalTypes | null;
    selectedBook: Book | null;
  };
};

const initialState: InitValues = {
  modal: {
    type: null,
    selectedBook: null,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: ModalTypes; book: Book }>
    ) => {
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

export const getStateModal = (state: RootState) => {
  return state.modal.modal;
};

export default modalSlice;
