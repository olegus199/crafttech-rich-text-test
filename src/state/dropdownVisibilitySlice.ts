import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentlyVisibleDropdown } from "../types";

interface InitialState {
  currentlyVisible: CurrentlyVisibleDropdown;
}

const initialState: InitialState = {
  currentlyVisible: null,
};

export const dropdownVisibilitySlice = createSlice({
  name: "dropdownVisibility",
  initialState: initialState,
  reducers: {
    currentlyVisibleDropdownChanged: (
      state: InitialState,
      action: PayloadAction<CurrentlyVisibleDropdown>,
    ) => {
      state.currentlyVisible = action.payload;
    },
  },
  selectors: {
    selectCurrentlyVisibleDropdown: state => state.currentlyVisible,
  },
});

export const { currentlyVisibleDropdownChanged } = dropdownVisibilitySlice.actions;

export const { selectCurrentlyVisibleDropdown } = dropdownVisibilitySlice.selectors;