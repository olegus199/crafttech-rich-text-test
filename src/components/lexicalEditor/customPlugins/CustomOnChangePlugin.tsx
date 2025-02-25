import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FC, useEffect } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useAppDispatch } from "../../../hooks/redux-hooks.tsx";
import { editorStateChanged } from "../../../state/editorStateSlice.ts";

const CustomOnChangePlugin: FC = () => {
  const [editor] = useLexicalComposerContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return editor.registerUpdateListener((listener) => {
      const { editorState } = listener;

      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor);
        const lexicalJSON = JSON.stringify(listener.editorState.toJSON());
        dispatch(editorStateChanged({
          html,
          lexicalJSON,
        }));
      });
    });
  }, [editor]);

  return null;
};

export default CustomOnChangePlugin;