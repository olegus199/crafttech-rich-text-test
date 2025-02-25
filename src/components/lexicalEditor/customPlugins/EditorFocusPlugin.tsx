import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FC, useEffect } from "react";

const EditorFocusPlugin: FC = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
};

export default EditorFocusPlugin;
