import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ArticleInterface from "../interfaces/ArticleInterface";

interface SearchResultsState {
  articles: ArticleInterface[];
}

const initialState: SearchResultsState = {
  articles: [],
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSearchResults(state, action: PayloadAction<ArticleInterface[]>) {
      state.articles = action.payload;
    },
  },
});

export const { setSearchResults } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
