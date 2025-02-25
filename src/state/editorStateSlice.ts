import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
  html: string,
  lexicalJSON?: string
}

interface InitialState {
  editorState: EditorState,
}

const initialState: InitialState = {
  editorState: {
    html: "",
    lexicalJSON: undefined,
  },
};

export const editorStateSlice = createSlice({
  name: "editorState",
  initialState,
  reducers: {
    editorStateChanged(state: InitialState, action: PayloadAction<EditorState>) {
      state.editorState = action.payload;
    },
  },
  selectors: {
    selectEditorState: state => state.editorState,
  },
});

export const { editorStateChanged } = editorStateSlice.actions;

export const { selectEditorState } = editorStateSlice.selectors;