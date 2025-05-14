import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      return { ...state, keyword: action.payload };
    },
  },
});

export const { setKeyword } = searchSlice.actions;
export function getKeyword(state) {
  return state.search.keyword;
}

export default searchSlice;
