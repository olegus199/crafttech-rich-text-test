import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Konva from "konva";
import ShapeConfig = Konva.ShapeConfig;
import { paramsEditingChanged } from "./editFigureParamsSlice.ts";

export type CustomShapesConfig = Pick<ShapeConfig, "width" | "height" | "id" | "x" | "y" | "strokeWidth" | "fill" | "stroke">

export type AvailableInputs = Pick<CustomShapesConfig, "width" | "height" | "strokeWidth">

interface InitialState {
  figures: CustomShapesConfig[];
  figureIdxToEdit: number | null;
  editedInputs: AvailableInputs | null;
}

const initialState: InitialState = {
  figures: [],
  figureIdxToEdit: null,
  editedInputs: null,
};

export const figuresSlice = createSlice({
  name: "figures",
  initialState,
  reducers: {
    figuresChanged(
      state: InitialState, action: PayloadAction<CustomShapesConfig>) {
      state.figures.push(action.payload);
    },
    figureIdxToEditChanged(
      state: InitialState,
      action: PayloadAction<{ idx: number | null, inputs: AvailableInputs | null }>,
    ) {
      state.figureIdxToEdit = action.payload.idx;
      state.editedInputs = action.payload.inputs;
    },
    figureEdited(state: InitialState, action: PayloadAction<{ name: string, value: number }>) {
      const { name, value } = action.payload;
      state.editedInputs = {
        ...state.editedInputs,
        [name]: value,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(paramsEditingChanged, (state: InitialState) => {
      const { figures, figureIdxToEdit, editedInputs } = state;
      if (figureIdxToEdit !== null) {
        figures[figureIdxToEdit] = {
          ...figures[figureIdxToEdit],
          ...editedInputs,
        };

      }
    });
  },
  selectors: {
    selectFigures: state => state.figures,
    selectFigureIdxToEdit: state => state.figureIdxToEdit,
    selectEditedInputs: state => state.editedInputs,
  },
});

export const { figuresChanged, figureIdxToEditChanged, figureEdited } = figuresSlice.actions;

export const { selectFigures, selectFigureIdxToEdit, selectEditedInputs } = figuresSlice.selectors;