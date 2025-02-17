import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: string;
}

interface SearchResultsState {
  articles: Article[];
}

const initialState: SearchResultsState = {
  articles: [],
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setSearchResults(state, action: PayloadAction<Article[]>) {
      state.articles = action.payload;
    },
  },
});

export const { setSearchResults } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
