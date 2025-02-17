import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import preferencesReducer from "./preferencesSlice";
import searchReducer from "./searchSlice";
import searchResultsReducer from "./searchResultsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    preferences: preferencesReducer,
    search: searchReducer,
    searchResults: searchResultsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
