import html2canvas from "html2canvas";
import Konva from "konva";
import { FC, useEffect, useRef } from "react";
import { Group, Rect } from "react-konva";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import { selectTool } from "../../state/toolSlice.ts";
import * as React from "react";
import { editorShown } from "../../state/editorVisibleSlice.ts";
import {
  selectKonvaImages,
} from "../../state/konvaImagesSlice.ts";
import { shapeColors } from "../../colors.ts";
import {
  CustomShapesConfig,
  figureIdxToEditChanged,
  selectFigureIdxToEdit,
} from "../../state/figuresSlice.ts";

interface ShapeProps {
  nodeConfig: CustomShapesConfig;
  idx: number;
}

const Shape: FC<ShapeProps> = ({ nodeConfig, idx }) => {
  const { width, height, x, y, id, strokeWidth, stroke, fill } = nodeConfig;

  const selectedTool = useAppSelector(selectTool);
  const konvaImage = useAppSelector(selectKonvaImages).find((i) => i.id === id);
  const figureIdxToEdit = useAppSelector(selectFigureIdxToEdit);

  const dispatch = useAppDispatch();

  const groupRef = useRef<Konva.Group>(null);
  const rectRef = useRef<Konva.Rect>(null);
  const imageRef = useRef<Konva.Image>(null);

  async function renderImage(html: string): Promise<void> {
    try {
      let editorHtml = new DOMParser().parseFromString(html, "text/html");
      const body = editorHtml.body;
      body.className = "temp-editor-body";

      const tempContainer = document.createElement("div");
      tempContainer.style.width = "fit-content";
      tempContainer.style.minWidth = "12.5rem";
      tempContainer.appendChild(body);
      document.body.appendChild(tempContainer);

      const canvas = await html2canvas(tempContainer);

      document.body.removeChild(tempContainer);

      const shape = new Konva.Image({
        x: 0,
        y: height !== undefined ? height + 10 : 0,
        scaleX: 1 / window.devicePixelRatio,
        scaleY: 1 / window.devicePixelRatio,
        image: canvas,
      });

      groupRef.current?.add(shape);
      imageRef.current = shape;

    } catch (e) {
      console.error(e);
    }
  }

  function handleGroupClick(): void {
    switch (selectedTool) {
      case  "shape":
        return;
      case "edit":
        const el = rectRef.current;
        if (!el) {
          return;
        }

        el.dash([10, 10]);
        dispatch(figureIdxToEditChanged({
          idx: idx,
          inputs: {
            width,
            height,
            strokeWidth,
          },
        }));
        return;
      case "cursor":
        if (id) {
          dispatch(editorShown(id));
        }
        return;
      default:
        return;
    }
  }

  useEffect(() => {
    if (konvaImage) {
      renderImage(konvaImage.html);
    }
  }, [konvaImage]);

  useEffect(() => {
    const el = rectRef.current;

    if (el) {
      if (figureIdxToEdit === idx) {
        el.dash([10, 10]);
      } else {
        el.dash([]);
      }
    }
  }, [figureIdxToEdit]);

  useEffect(() => {
    if (selectedTool !== "edit") {
      dispatch(figureIdxToEditChanged({ idx: null, inputs: null }));
    }
  }, [selectedTool]);

  return (
    <>
      <Group
        ref={groupRef}
        x={x}
        y={y}
        onClick={handleGroupClick}
        onDragMove={() => {
          // some implementation
        }}
        draggable
      >
        <Rect
          ref={rectRef}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          width={width}
          height={height}
        />
      </Group>
    </>
  );
};

export default Shape;