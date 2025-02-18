import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ArticleInterface from "../interfaces/ArticleInterface";

interface SearchState {
  query: string;
  articles: ArticleInterface[];
  originalArticles: ArticleInterface[];
}

const initialState: SearchState = {
  query: "",
  articles: [],
  originalArticles: [],
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<ArticleInterface[]>) => {
      state.articles = action.payload;
    },
    setOriginalArticles: (state, action: PayloadAction<ArticleInterface[]>) => {
      state.originalArticles = action.payload;
    },
  },
});

export const { setSearchResults, setOriginalArticles } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
