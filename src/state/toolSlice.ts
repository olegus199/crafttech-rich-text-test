import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ToolKind = "cursor" | "shape" | "edit";

interface InitialState {
  tool: ToolKind;
}

const initialState: InitialState = {
  tool: "cursor",
};

export const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    toolChanged(state: InitialState, action: PayloadAction<ToolKind>) {
      state.tool = action.payload;
    },
  },
  selectors: {
    selectTool: state => state.tool,
  },
});

export const { toolChanged } = toolSlice.actions;

export const { selectTool } = toolSlice.selectors;