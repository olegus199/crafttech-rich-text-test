import styles from "../LexicalEditor.module.scss";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { FC, useEffect, useState } from "react";
import { FaUndoAlt, FaRedoAlt } from "react-icons/fa";

const LowPriority = 1;

const CustomHistoryActions: FC = () => {
  const [editor] = useLexicalComposerContext();

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor]);

  return (
    <div className={styles.history_container}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className={`${styles.toolbar_button} ${
          canUndo && styles.button_active
        }`}
      >
        <FaUndoAlt className={styles.toolbar_icon} />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className={`${styles.toolbar_button} ${
          canRedo && styles.button_active
        }`}
      >
        <FaRedoAlt className={styles.toolbar_icon} />
      </button>
    </div>
  );
};

export default CustomHistoryActions;