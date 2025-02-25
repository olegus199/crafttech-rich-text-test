import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedTextFormat } from "../types";

const initialTextFormat: SelectedTextFormat = {
  bold: false,
  code: false,
  highlight: false,
  italic: false,
  link: false,
  restore: false,
  strikethrough: false,
  subscript: false,
  superscript: false,
  underline: false,
  uppercase: false,
  capitalize: false,
  lowercase: false,
};

interface InitialState {
  selectedTextFormat: SelectedTextFormat;
}

const initialState: InitialState = {
  selectedTextFormat: initialTextFormat,
};

export const selectedTextFormatSlice = createSlice({
  name: "selectedTextFormat",
  initialState: initialState,
  reducers: {
    selectedTextFormatChanged: (
      state: InitialState,
      action: PayloadAction<SelectedTextFormat>,
    ) => {
      state.selectedTextFormat = action.payload;
    },
    selectedTextFormatReset: (state: InitialState) => {
      state.selectedTextFormat = initialState.selectedTextFormat;
    },
  },
  selectors: {
    selectTextFormat: state => state.selectedTextFormat,
  },

});

export const { selectedTextFormatChanged, selectedTextFormatReset } =
  selectedTextFormatSlice.actions;

export const { selectTextFormat } = selectedTextFormatSlice.selectors;