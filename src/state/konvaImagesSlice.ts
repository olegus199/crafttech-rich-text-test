import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface KonvaImageContent {
  id: string;
  html: string;
  lexicalJSON?: string;
}

interface InitialState {
  images: KonvaImageContent[];
}

const initialState: InitialState = {
  images: [],
};

export const konvaImagesSlice = createSlice({
  name: "konvaImages",
  initialState,
  reducers: {
    konvaImagesAdded(state: InitialState, action: PayloadAction<KonvaImageContent>) {
      const images = state.images;
      const { id, html, lexicalJSON } = action.payload;

      const item = images.find(image => image.id === id);

      if (item) {
        const itemIdx = images.indexOf(item);
        images[itemIdx].html = html;
        images[itemIdx].lexicalJSON = lexicalJSON;
      } else {
        state.images.push(action.payload);
      }
    },
  },
  selectors: {
    selectKonvaImages: state => state.images,
  },
});

export const { konvaImagesAdded } = konvaImagesSlice.actions;

export const { selectKonvaImages } = konvaImagesSlice.selectors;