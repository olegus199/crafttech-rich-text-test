import styles from "./Canvas.module.scss";
import { useState } from "react";
import { Layer, Stage } from "react-konva";
import Shape from "../shape/Shape";
import { useAppSelector } from "../../hooks/redux-hooks.tsx";
import { selectTool } from "../../state/toolSlice.ts";
import { KonvaEventObject, NodeConfig } from "konva/lib/Node";

const Canvas = () => {
  const selectedTool = useAppSelector(selectTool);

  const [figures, setFigures] = useState<NodeConfig[]>([]);

  function handleOnClick(e: KonvaEventObject<MouseEvent>) {
    if (selectedTool === "cursor") {
      return;
    }

    const stage = e.target.getStage();

    if (!stage) {
      return;
    }

    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();

    if (!point) {
      return;
    }

    setFigures((prev) => [
      ...prev,
      {
        id: Date.now().toString(36),
        width: 100,
        height: 100,
        type: "rect",
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
        html: "",
        text: "",
      },
    ]);
  };

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
        {figures.map((figure, i) => {
          return (
            <Shape
              key={i}
              nodeConfig={{
                x: figure.x,
                y: figure.y,
                width: figure.width,
                height: figure.height,
                id: figure.id,
              }}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;