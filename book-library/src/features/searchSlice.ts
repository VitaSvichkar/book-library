import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { InitValuesSearch, QueryTypes } from '../types/searchSlice';

const initialState: InitValuesSearch = {
  keyword: '',
  queryType: 'author',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      return { ...state, keyword: action.payload };
    },

    setTypeQuery: (state, action: PayloadAction<QueryTypes>) => {
      return { ...state, queryType: action.payload };
    },
  },
});

export const { setKeyword, setTypeQuery } = searchSlice.actions;

export const getKeyword = (state: RootState): InitValuesSearch['keyword'] => {
  return state.search.keyword;
};

export const getType = (state: RootState): InitValuesSearch['queryType'] => {
  return state.search.queryType;
};

export default searchSlice;
