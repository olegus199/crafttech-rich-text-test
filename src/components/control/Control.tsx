import styles from "./Control.module.scss";
import { FC, JSX, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import { selectTool, toolChanged, ToolKind } from "../../state/toolSlice.ts";
import { LuMousePointer2, LuPlus } from "react-icons/lu";
import { GrEdit } from "react-icons/gr";
import * as React from "react";
import { selectFigureIdxToEdit, selectFigures } from "../../state/figuresSlice.ts";
import { paramsEditingChanged } from "../../state/editFigureParamsSlice.ts";

interface ITool {
  tool: ToolKind;
  icon: JSX.Element;
}

const initTools: ITool[] = [
  {
    tool: "cursor",
    icon: <LuMousePointer2 className={styles.tool_icon} />,
  },
  {
    tool: "shape",
    icon: <LuPlus className={styles.tool_icon} />,
  },
];

const editTool: ITool = {
  tool: "edit",
  icon: <GrEdit className={styles.tool_icon} />,
};

const toolsLocales: Record<ToolKind, string> = {
  cursor: "Взаимодействие",
  shape: "Добавление",
  edit: "Редактирование",
};

const Control: FC = () => {
  const selectedTool = useAppSelector(selectTool);
  const figures = useAppSelector(selectFigures);
  const figureIdxToEdit = useAppSelector(selectFigureIdxToEdit);

  const [tools, setTools] = useState<ITool[]>(initTools);

  const dispatch = useAppDispatch();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(toolChanged(e.target.value as ToolKind));
  }

  function handleParamsButtonClick(): void {
    dispatch(paramsEditingChanged(true));
  }

  useEffect(() => {
    if (figures.length === 0) {
      setTools((initTools));
    } else {
      if (figures.length < 2 && tools.length < 3) {
        setTools((prev) => [
          ...prev,
          editTool,
        ]);
      }
    }
  }, [figures, tools]);

  return (
    <div className={styles.controls}>
      <div className={styles.tools_container}>
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
      </div>
      {figureIdxToEdit !== null && (
        <button
          onClick={handleParamsButtonClick}
          className={styles.params_button}
        >
          Параметры
        </button>
      )}
    </div>
  );
};

export default Control;