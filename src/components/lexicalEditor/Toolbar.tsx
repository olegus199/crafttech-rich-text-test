import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store.ts";
import CustomAlignActions from "./customActions/CustomAlignActions.tsx";
import CustomHeadingActions from "./customActions/CustomHeadingActions.tsx";
import CustomHistoryActions from "./customActions/CustomHistoryActions.tsx";
import CustomTextActions from "./customActions/CustomTextActions.tsx";
import styles from "./LexicalEditor.module.scss";
import { FC, useCallback, useEffect, useRef } from "react";
import { $isHeadingNode } from "@lexical/rich-text";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isListNode, ListNode } from "@lexical/list";
import { ActiveHeading, SelectedTextFormat } from "../../types.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import {
  currentlyVisibleDropdownChanged,
  selectCurrentlyVisibleDropdown,
} from "../../state/dropdownVisibilitySlice.ts";
import {
  selectedTextFormatChanged,
  selectTextFormat,
} from "../../state/selectedTextFormatSlice.ts";
import { activeHeadingChanged } from "../../state/activeDropdownOptionSlice.ts";
import { dropdownDimensionsChanged } from "../../state/dropdownDimensionsSlice.ts";

const Toolbar: FC = () => {
  const dispatch = useAppDispatch();
  const [editor] = useLexicalComposerContext();

  const toolbarRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = {
    heading: useRef<HTMLDivElement>(null),
    insert: useRef<HTMLDivElement>(null),
    align: useRef<HTMLDivElement>(null),
  };

  const currentlyVisibleDropdown = useAppSelector(selectCurrentlyVisibleDropdown);
  const selectedTextFormat = useSelector(selectTextFormat);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          dispatch(activeHeadingChanged(type as ActiveHeading));
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          dispatch(activeHeadingChanged(type as ActiveHeading));
        }
      }

      // Update text format
      if ($isTextNode(anchorNode)) {
        const selectedTextFormatPayload: Omit<
          SelectedTextFormat,
          "link" | "restore"
        > = {
          bold: anchorNode.hasFormat("bold"),
          italic: anchorNode.hasFormat("italic"),
          code: anchorNode.hasFormat("code"),
          highlight: anchorNode.hasFormat("highlight"),
          strikethrough: anchorNode.hasFormat("strikethrough"),
          subscript: anchorNode.hasFormat("subscript"),
          superscript: anchorNode.hasFormat("superscript"),
          underline: anchorNode.hasFormat("underline"),
          uppercase: anchorNode.hasFormat("uppercase"),
          lowercase: anchorNode.hasFormat("lowercase"),
          capitalize: anchorNode.hasFormat("capitalize"),
        };

        dispatch(
          selectedTextFormatChanged({
            ...selectedTextFormat,
            ...selectedTextFormatPayload,
            restore: Object.values(selectedTextFormatPayload).some(
              (val) => val,
            ),
          }),
        );
      }
    }
  }, [editor, selectedTextFormat]);

  // Lexical register
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _) => {
          updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, updateToolbar]);

  // HINT I'm only setting one dimension (top) and only for headingRef, because
  // in current implementation all dropdowns have same sizes. Shoud be changed
  // if styling changes
  useEffect(() => {
    function setDimensions(): void {
      if (!dropdownRefs.heading.current) {
        return;
      }

      const rect = dropdownRefs.heading.current.getBoundingClientRect();
      const additionalSpace = 3;
      dispatch(dropdownDimensionsChanged(rect.height + additionalSpace));
    }

    setDimensions();
  }, []);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (currentlyVisibleDropdown) {
        if (
          !dropdownRefs[currentlyVisibleDropdown].current?.contains(
            e.target as Node,
          )
        ) {
          dispatch(currentlyVisibleDropdownChanged(null));
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentlyVisibleDropdown]);

  return (
    <div
      ref={toolbarRef}
      className={styles.toolbar}
    >
      <CustomHistoryActions />
      <hr className={styles.toolbar_divider} />
      <CustomHeadingActions ref={dropdownRefs.heading} />
      <hr className={styles.toolbar_divider} />
      <CustomTextActions />
      <hr className={styles.toolbar_divider} />
      <CustomAlignActions ref={dropdownRefs.align} />
    </div>
  );
};

export default Toolbar;