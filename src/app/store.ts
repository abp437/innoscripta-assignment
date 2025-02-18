import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./preferencesSlice";
import searchReducer from "./searchSlice";
import searchResultsReducer from "./searchResultsSlice";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    search: searchReducer,
    searchResults: searchResultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
