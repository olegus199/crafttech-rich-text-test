import html2canvas from "html2canvas";
import Konva from "konva";
import { FC, useEffect, useRef, useState } from "react";
import { Group, Rect, Shape } from "react-konva";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import { selectTool } from "../../state/toolSlice.ts";
import { NodeConfig } from "konva/lib/Node";
import * as React from "react";
import { editorShown } from "../../state/editorVisibleSlice.ts";
import {
  selectKonvaImages,
} from "../../state/konvaImagesSlice.ts";
import { shapeColors } from "../../colors.ts";
import { figureIdxToEditChanged, selectFigureIdxToEdit } from "../../state/figuresSlice.ts";

interface ShapeProps {
  nodeConfig: NodeConfig;
  idx: number;
}

const CustomShape: FC<ShapeProps> = ({ nodeConfig, idx }) => {
  const { width, height, x, y, id, type } = nodeConfig;
  console.log(nodeConfig);

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
        dispatch(figureIdxToEditChanged(idx));
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
      dispatch(figureIdxToEditChanged(null));
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
        <Shape
          ref={rectRef}
          type={type}
          stroke={shapeColors.black}
          fill={shapeColors.black}
          width={width}
          height={height}
        />
      </Group>
    </>
  );
};

export default CustomShape;