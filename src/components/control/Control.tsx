import styles from "./Control.module.scss";
import { FC, JSX } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import { selectTool, toolChanged, ToolKind } from "../../state/toolSlice.ts";
import { LuMousePointer2, LuPlus } from "react-icons/lu";
import * as React from "react";

interface ITool {
  tool: ToolKind;
  icon: JSX.Element;
}

const tools: ITool[] = [
  {
    tool: "cursor",
    icon: <LuMousePointer2 className={styles.tool_icon} />,
  },
  {
    tool: "shape",
    icon: <LuPlus className={styles.tool_icon} />,
  },
];

const toolsLocales: Record<ToolKind, string> = {
  cursor: "Взаимодействие",
  shape: "Добавление",
};

const Control: FC = () => {
  const selectedTool = useAppSelector(selectTool);

  const dispatch = useAppDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toolChanged(e.target.value as ToolKind));
  };

  return (
    <div className={styles.control_container}>
      {tools.map(({ tool, icon }, idx) => (
        <label
          htmlFor={tool}
          key={idx}
          className={`${styles.tool} ${tool === selectedTool && styles.selected}`}
        >
          <input
            type="radio"
            id={tool}
            name="control"
            value={tool}
            checked={tool === selectedTool}
            onChange={handleOnChange}
            style={{ display: "none" }}
          />
          {icon}
          <label
            htmlFor={tool}
            className={styles.tool_locales}
          >{toolsLocales[tool]}</label>
        </label>
      ))}
      {/*<label htmlFor="cursor">*/}
      {/*  <input*/}
      {/*    type="radio"*/}
      {/*    id="cursor"*/}
      {/*    name="control"*/}
      {/*    value="cursor"*/}
      {/*    checked={tool === "cursor"}*/}
      {/*    onChange={handleOnChange}*/}
      {/*  />*/}
      {/*  <label htmlFor="cursor">Взаимодействие</label>*/}
      {/*</label>*/}

      {/*<div>*/}
      {/*  <input*/}
      {/*    type="radio"*/}
      {/*    id="shape"*/}
      {/*    name="control"*/}
      {/*    value="shape"*/}
      {/*    checked={tool === "shape"}*/}
      {/*    onChange={handleOnChange}*/}
      {/*  />*/}
      {/*  <label htmlFor="shape">Добавление</label>*/}
      {/*</div>*/}
    </div>
  );
};

export default Control;