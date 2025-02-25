import styles from "../LexicalEditor.module.scss";
import { forwardRef } from "react";
import { HeadingTagType } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_HEADING_COMMAND } from "../customPlugins/CustomHeadingPlugin.tsx";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import useHelpers from "../../../hooks/useHelpers";
import DropdownToggleButton from "../UI/DropdownToggleButton.tsx";
import Dropdown from "../UI/Dropdown.tsx";
import { ActiveHeading } from "../../../types.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks.tsx";
import {
  activeHeadingChanged,
  selectActiveHeading,
} from "../../../state/activeDropdownOptionSlice.ts";
import { currentlyVisibleDropdownChanged } from "../../../state/dropdownVisibilitySlice.ts";

const headingTags: HeadingTagType[] = ["h1", "h2", "h3", "h4"];

const CustomHeadingActions = forwardRef<HTMLDivElement>(({}, ref) => {
  const [editor] = useLexicalComposerContext();
  const dispatch = useAppDispatch();
  const { renderTextOrIcon } = useHelpers();

  const activeHeading = useAppSelector(selectActiveHeading);

  function handleDropdownButtonClick(tag: ActiveHeading): void {
    if (tag === "paragraph") {
      handleResetHeading();
    } else {
      handleHeadingClick(tag);
    }

    dispatch(activeHeadingChanged(tag));
    dispatch(currentlyVisibleDropdownChanged(null));
  }

  function handleHeadingClick(headingTag: HeadingTagType): void {
    editor.dispatchCommand(FORMAT_HEADING_COMMAND, headingTag);
  }

  function handleResetHeading(): void {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  }

  return (
    <div
      ref={ref}
      className={styles.heading_selection_container}
    >
      <DropdownToggleButton kind={"heading"} />

      <Dropdown kind={"heading"}>
        <button
          onClick={() => handleDropdownButtonClick("paragraph")}
          className={`${styles.dropdown_button} ${
            activeHeading === "paragraph" && styles.dropdown_button_active
          }`}
        >
          {renderTextOrIcon({ kind: "heading", tag: "paragraph" }).icon}
          {renderTextOrIcon({ kind: "heading", tag: "paragraph" }).text}
        </button>
        {headingTags.map((headingTag, idx) => (
          <button
            key={idx}
            onClick={() => handleDropdownButtonClick(headingTag)}
            className={`${styles.dropdown_button} ${
              activeHeading === headingTag && styles.dropdown_button_active
            }`}
          >
            {renderTextOrIcon({ kind: "heading", tag: headingTag }).icon}
            {renderTextOrIcon({ kind: "heading", tag: headingTag }).text}
          </button>
        ))}
      </Dropdown>
    </div>
  );
});

export default CustomHeadingActions;