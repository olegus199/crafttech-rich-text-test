import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { konvaImagesAdded } from "./konvaImagesSlice.ts";

interface EditorParams {
  isVisible: boolean;
  id: string;
}

interface InitialState {
  editorParams: EditorParams;
}

const initialState: InitialState = {
  editorParams: {
    isVisible: false,
    id: "",
  },
};

export const editorVisibleSlice = createSlice({
  name: "editorVisible",
  initialState,
  reducers: {
    editorShown(state: InitialState, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      state.editorParams = {
        isVisible: true,
        id,
      };
    },
    editorHidden(state: InitialState) {
      state.editorParams = initialState.editorParams;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(konvaImagesAdded, (state: InitialState) => {
      state.editorParams = initialState.editorParams;
    });
  },
  selectors: {
    selectEditorParams: state => state.editorParams,
  },
});

export const { editorShown, editorHidden } = editorVisibleSlice.actions;

export const { selectEditorParams } = editorVisibleSlice.selectors;