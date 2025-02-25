import styles from "./LexicalEditor.module.scss";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { FC, useMemo } from "react";
import EditorFocusPlugin from "./customPlugins/EditorFocusPlugin.tsx";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import "./EditorStyles.scss";
import { HeadingNode } from "@lexical/rich-text";
import { CustomHeadingPlugin } from "./customPlugins/CustomHeadingPlugin.tsx";
import Toolbar from "./Toolbar.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import { selectEditorParams } from "../../state/editorVisibleSlice.ts";
import CustomOnChangePlugin from "./customPlugins/CustomOnChangePlugin.tsx";
import { konvaImagesAdded, selectKonvaImages } from "../../state/konvaImagesSlice.ts";
import { selectEditorState } from "../../state/editorStateSlice.ts";

const LexicalEditor: FC = () => {
  const editorVisibilityParams = useAppSelector(selectEditorParams);
  const konvaImage = useAppSelector(selectKonvaImages)
    .find((i) => i.id === editorVisibilityParams.id);
  const editorState = useAppSelector(selectEditorState);

  const dispatch = useAppDispatch();

  const lexicalConfig = useMemo<InitialConfigType>(() => {
    return {
      namespace: "Rich Text Editor",
      nodes: [HeadingNode],
      theme: {
        text: {
          bold: "le-bold",
          italic: "le-italic",
          code: "le-code",
          underline: "le-underline",
          strikethrough: "le-strikethrough",
          highlight: "le-highlight",
          subscript: "le-subscript",
          superscript: "le-superscript",
        },
        banner: "le-banner",
        heading: {
          h1: "le-heading le-h1",
          h2: "le-heading le-h2",
          h3: "le-heading le-h3",
          h4: "le-heading le-h4",
        },
        link: "le-link",
      },
      onError: (e) => {
        console.error("ERROR:", e);
      },
      editorState: konvaImage?.lexicalJSON,
    };
  }, []);

  function handleSaveButtonClick(): void {
    const { id } = editorVisibilityParams;
    const { html, lexicalJSON } = editorState;

    dispatch(konvaImagesAdded(
      { id, html, lexicalJSON },
    ));
  }

  return (
    <div className={styles.editor_container}>
      <LexicalComposer initialConfig={lexicalConfig}>
        <Toolbar />
        <div className={styles.editor_text_input}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={styles.content_editable}
                id="content_editable"
              />
            }
            placeholder={
              <div className={styles.placeholder}>
                Начните что-нибудь писать...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <EditorFocusPlugin />
        <CustomHeadingPlugin />
        <CustomOnChangePlugin />
      </LexicalComposer>

      <button
        onClick={handleSaveButtonClick}
        className={styles.save_button}
      >
        Сохранить
      </button>
    </div>
  );
};

export default LexicalEditor;