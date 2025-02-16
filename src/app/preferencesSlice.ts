import { createSlice } from "@reduxjs/toolkit";

interface PreferencesState {
  isVisible: boolean;
}

const initialState: PreferencesState = {
  isVisible: false,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    togglePreferences: (state) => {
      state.isVisible = !state.isVisible;
    },
    showPreferences: (state) => {
      state.isVisible = true;
    },
    hidePreferences: (state) => {
      state.isVisible = false;
    },
  },
});

export const { togglePreferences, showPreferences, hidePreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
