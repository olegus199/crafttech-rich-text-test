import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  top: number;
}

const initialState: InitialState = {
  top: 0,
};

export const dropdownDimensionsSlice = createSlice({
  name: "dropdownDimensions",
  initialState: initialState,
  reducers: {
    dropdownDimensionsChanged: (
      state: InitialState,
      action: PayloadAction<number>,
    ) => {
      state.top = action.payload;
    },
  },
  selectors: {
    selectDropdownDimensions: state => state.top,
  },
});

export const { dropdownDimensionsChanged } = dropdownDimensionsSlice.actions;

export const { selectDropdownDimensions } = dropdownDimensionsSlice.selectors;