import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { toolSlice } from "./toolSlice.ts";
import { dropdownVisibilitySlice } from "./dropdownVisibilitySlice.ts";
import { selectedTextFormatSlice } from "./selectedTextFormatSlice.ts";
import { activeDropdownOptionSlice } from "./activeDropdownOptionSlice.ts";
import { dropdownDimensionsSlice } from "./dropdownDimensionsSlice.ts";
import { editorVisibleSlice } from "./editorVisibleSlice.ts";
import { konvaImagesSlice } from "./konvaImagesSlice.ts";
import { editorStateSlice } from "./editorStateSlice.ts";

const RootReducer = combineSlices(
  toolSlice, dropdownVisibilitySlice, selectedTextFormatSlice, activeDropdownOptionSlice,
  dropdownDimensionsSlice, editorVisibleSlice, konvaImagesSlice, editorStateSlice,
);

export type RootState = ReturnType<typeof RootReducer>;

const store = configureStore({
  reducer: RootReducer,
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"]
export default store;