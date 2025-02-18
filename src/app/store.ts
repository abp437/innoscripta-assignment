import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./preferencesSlice";
import searchReducer from "./searchSlice";
import searchResultsReducer from "./searchResultsSlice";
import filtersReducer from "./filtersSlice";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    search: searchReducer,
    searchResults: searchResultsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
