import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  paramsEditing: boolean;
}

const initialState: InitialState = {
  paramsEditing: false,
};

export const editFigureParamsSlice = createSlice({
  name: "editFigureParamsSlice",
  initialState,
  reducers: {
    paramsEditingChanged(state: InitialState, action: PayloadAction<boolean>) {
      state.paramsEditing = action.payload;
    },
  },
  selectors: {
    selectParamsEditing: state => state.paramsEditing,
  },
});

export const { paramsEditingChanged } = editFigureParamsSlice.actions;

export const { selectParamsEditing } = editFigureParamsSlice.selectors;