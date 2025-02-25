import html2canvas from "html2canvas";
import Konva from "konva";
import { FC, useEffect, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import { selectTool } from "../../state/toolSlice.ts";
import { NodeConfig } from "konva/lib/Node";
import * as React from "react";
import { editorShown } from "../../state/editorVisibleSlice.ts";
import {
  selectKonvaImages,
} from "../../state/konvaImagesSlice.ts";

interface ShapeProps {
  nodeConfig: NodeConfig;
}

const Shape: FC<ShapeProps> = ({ nodeConfig: { width, height, x, y, id } }) => {
  const selectedTool = useAppSelector(selectTool);
  const konvaImage = useAppSelector(selectKonvaImages).find((i) => i.id === id);

  const dispatch = useAppDispatch();

  const groupRef = useRef<Konva.Group>(null);
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
    if (selectedTool === "shape") {
      return;
    }

    // imageRef.current?.hide();

    if (id) {
      dispatch(editorShown({
        id,
      }));
    }

  }

  useEffect(() => {
    if (konvaImage) {
      renderImage(konvaImage.html);
    }
  }, [konvaImage]);

  return (
    <>
      <Group
        ref={groupRef}
        x={x}
        y={y}
        onClick={handleGroupClick}
        draggable
      >
        <Rect
          stroke={"black"}
          width={width}
          height={height}
        />
      </Group>
    </>
  );
};

export default Shape;