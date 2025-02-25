import { HeadingTagType } from "@lexical/rich-text";
import { ElementFormatType, TextFormatType } from "lexical";
import { JSX } from "react";
import * as React from "react";

export type ActiveHeading = HeadingTagType | "paragraph";

export type ActiveAlignment = ElementFormatType | "outdent" | "indent";

export type CurrentlyVisibleDropdown = "heading" | "align" | "insert" | null;

export type CustomTextFormatType = TextFormatType | "link" | "restore";

export type SelectedTextFormat = Record<CustomTextFormatType, boolean>;

interface HeadingPayload {
  kind: "heading";
  tag: ActiveHeading;
}

interface AlignPayload {
  kind: "align";
  tag: ActiveAlignment;
}

interface InsertPayload {
  kind: "insert";
  tag: "";
}

interface TextFormatPayload {
  kind: "textFormat";
  tag: CustomTextFormatType;
}

export interface TextAndIcon {
  text: string;
  icon: JSX.Element;
}

export type RenderTextOrIcon = {
  (payload: HeadingPayload): TextAndIcon;
  (payload: AlignPayload): TextAndIcon;
  (payload: InsertPayload): TextAndIcon;
  (payload: TextFormatPayload): TextAndIcon;
};

export interface TextFormatPopupProps {
  message: string;
  dimensions: {
    top: number;
    left: number;
  };
}

export type TextFromatHints = Record<CustomTextFormatType, string>;

export type TextFormatRefs = Record<
  CustomTextFormatType,
  React.RefObject<HTMLButtonElement | null>
>;