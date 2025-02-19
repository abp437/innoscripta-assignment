import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  sourceFilter: string;
  categoryFilter: string;
  orderByFilter: "asc" | "desc";
}

const initialState: FiltersState = {
  sourceFilter: "all",
  categoryFilter: "all",
  orderByFilter: "desc",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSourceFilter: (state, action: PayloadAction<string>) => {
      state.sourceFilter = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
    setOrderByFilter: (state, action: PayloadAction<"asc" | "desc">) => {
      state.orderByFilter = action.payload;
    },
  },
});

export const { setSourceFilter, setCategoryFilter, setOrderByFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
