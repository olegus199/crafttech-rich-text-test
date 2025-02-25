import styles from "../LexicalEditor.module.scss";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";
import { FC } from "react";
import useHelpers from "../../../hooks/useHelpers";
import DropdownToggleButton from "../UI/DropdownToggleButton.tsx";
import Dropdown from "../UI/Dropdown.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks.tsx";
import {
  activeAlignmentChanged,
  selectActiveAlignment,
} from "../../../state/activeDropdownOptionSlice.ts";
import { ActiveAlignment } from "../../../types.ts";
import { currentlyVisibleDropdownChanged } from "../../../state/dropdownVisibilitySlice.ts";
import * as React from "react";

const formatTypes: ElementFormatType[] = ["left", "center", "right", "justify"];

interface CustomAlignActionsProps {
  ref: React.RefObject<HTMLDivElement | null>;
}

const CustomAlignActions: FC<CustomAlignActionsProps> = ({ ref }) => {
  const [editor] = useLexicalComposerContext();
  const dispatch = useAppDispatch();
  const { renderTextOrIcon } = useHelpers();

  const activeAlignment = useAppSelector(selectActiveAlignment);

  function handleDropdownButtonClick(formatType: ActiveAlignment): void {
    if (formatType === "outdent") {
      editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
    } else if (formatType === "indent") {
      editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
    } else {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType);
    }

    dispatch(activeAlignmentChanged(formatType));
    dispatch(currentlyVisibleDropdownChanged(null));
  }

  return (
    <div
      ref={ref}
      className={styles.align_selection_container}
    >
      <DropdownToggleButton kind={"align"} />

      <Dropdown kind={"align"}>
        {formatTypes.map((formatType, idx) => (
          <button
            key={idx}
            onClick={() => handleDropdownButtonClick(formatType)}
            className={`${styles.dropdown_button} ${
              activeAlignment === formatType && styles.dropdown_button_active
            }`}
          >
            {renderTextOrIcon({ kind: "align", tag: formatType }).icon}
            {renderTextOrIcon({ kind: "align", tag: formatType }).text}
          </button>
        ))}
        <button
          onClick={() => handleDropdownButtonClick("outdent")}
          className={`${styles.dropdown_button} ${
            activeAlignment === "outdent" && styles.dropdown_button_active
          }`}
        >
          {renderTextOrIcon({ kind: "align", tag: "outdent" }).icon}
          {renderTextOrIcon({ kind: "align", tag: "outdent" }).text}
        </button>
        <button
          onClick={() => handleDropdownButtonClick("indent")}
          className={`${styles.dropdown_button} ${
            activeAlignment === "indent" && styles.dropdown_button_active
          }`}
        >
          {renderTextOrIcon({ kind: "align", tag: "indent" }).icon}
          {renderTextOrIcon({ kind: "align", tag: "indent" }).text}
        </button>
      </Dropdown>
    </div>
  );
};

export default CustomAlignActions;