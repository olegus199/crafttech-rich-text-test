import styles from "./Canvas.module.scss";
import { useState } from "react";
import { Layer, Stage } from "react-konva";
import Shape from "../shape/Shape";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import { selectTool } from "../../state/toolSlice.ts";
import { KonvaEventObject, NodeConfig } from "konva/lib/Node";
import { figuresChanged, selectFigures } from "../../state/figuresSlice.ts";
import { shapeColors } from "../../colors.ts";

const Canvas = () => {
  const figures = useAppSelector(selectFigures);

  const selectedTool = useAppSelector(selectTool);
  const dispatch = useAppDispatch();

  function handleOnClick(e: KonvaEventObject<MouseEvent>) {
    if (selectedTool === "shape") {
      const stage = e.target.getStage();

      if (!stage) {
        return;
      }

      const stageOffset = stage.absolutePosition();
      const point = stage.getPointerPosition();

      if (!point) {
        return;
      }

      dispatch(figuresChanged({
        id: Date.now().toString(36),
        width: 100,
        height: 100,
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
        stroke: shapeColors.black,
        strokeWidth: 1,
        fill: "transparent",
      }));
    }
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={selectedTool === "cursor"}
      onClick={handleOnClick}
      style={{ cursor: selectedTool === "shape" ? "cell" : "" }}
      className={styles.stage}
    >
      <Layer>
        {figures.map((figure, i) => (
            <Shape
              key={i}
              nodeConfig={{ ...figure }}
              idx={i}
            />
          ),
        )}
      </Layer>
    </Stage>
  );
};

export default Canvas;