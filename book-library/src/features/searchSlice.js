import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  queryType: 'author',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      return { ...state, keyword: action.payload };
    },

    setTypeQuery: (state, action) => {
      return { ...state, queryType: action.payload };
    },
  },
});

export const { setKeyword, setTypeQuery, setLastKeyword } = searchSlice.actions;
export function getKeyword(state) {
  return state.search.keyword;
}

export function getType(state) {
  return state.search.queryType;
}

export default searchSlice;
