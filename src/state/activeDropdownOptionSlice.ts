import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveAlignment, ActiveHeading } from "../types";

interface InitialState {
  activeHeading: ActiveHeading;
  activeAlignment: ActiveAlignment;
}

const initialState: InitialState = {
  activeHeading: "paragraph",
  activeAlignment: "left",
};

export const activeDropdownOptionSlice = createSlice({
  name: "activeHeading",
  initialState: initialState,
  reducers: {
    activeHeadingChanged: (
      state: InitialState,
      action: PayloadAction<ActiveHeading>,
    ) => {
      state.activeHeading = action.payload;
    },
    activeAlignmentChanged: (
      state: InitialState,
      action: PayloadAction<ActiveAlignment>,
    ) => {
      state.activeAlignment = action.payload;
    },
  },
  selectors: {
    selectActiveHeading: state => state.activeHeading,
    selectActiveAlignment: state => state.activeAlignment,
  },
});

export const { activeHeadingChanged, activeAlignmentChanged } =
  activeDropdownOptionSlice.actions;

export const { selectActiveHeading, selectActiveAlignment } = activeDropdownOptionSlice.selectors;