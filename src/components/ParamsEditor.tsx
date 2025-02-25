import styles from "./ParamsEditor.module.scss";
import { FC, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { paramsEditingChanged } from "../state/editFigureParamsSlice.ts";
import * as React from "react";
import { useAppSelector } from "../hooks/redux-hooks.tsx";
import { figureEdited, selectEditedInputs } from "../state/figuresSlice.ts";
import { shapeColors } from "../colors.ts";

const ParamsEditor: FC = () => {
  const inputData = useAppSelector(selectEditedInputs);

  const dispatch = useDispatch();

  function handleClose(): void {
    dispatch(paramsEditingChanged(false));

  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    const numVal = Number(value);
    if (isNaN(numVal)) {
      return;
    }
    dispatch(figureEdited({ name, value: numVal }));
  }

  return (
    <div className={styles.params_editor}>
      <FaXmark
        onClick={handleClose}
        className={styles.close_icon}
      />
      <h2 className={styles.h2}>Редактирование параметров</h2>
      <div className={styles.inputs}>
        {inputData && Object.entries(inputData).map(([key, value], idx) => (
          <div
            key={idx}
            className={styles.input_container}
          >
            <label
              htmlFor={key}
              className={styles.label}
            >
              {key}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={value as string | number}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        ))}
      </div>
      <div className={styles.result}>
        <svg
          width={inputData?.width}
          height={inputData?.height}
        >
          <rect
            width={inputData?.width}
            height={inputData?.height}
            strokeWidth={inputData?.strokeWidth}
            fill="transparent"
            stroke={shapeColors.black}
          />
        </svg>
      </div>
    </div>
  );
};

export default ParamsEditor;