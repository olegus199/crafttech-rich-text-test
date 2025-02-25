import styles from "./App.module.scss";
import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import LexicalEditor from "./components/lexicalEditor/LexicalEditor.tsx";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks.tsx";
import { editorHidden, selectEditorParams } from "./state/editorVisibleSlice.ts";
import { useEffect } from "react";

function App() {
  const isEditorVisible = useAppSelector(selectEditorParams).isVisible;

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Crafftech rich text</h1>
      {isEditorVisible && (
        <div className={styles.editor_wrapper}>
          <LexicalEditor />
        </div>
      )}
      <div className={styles.konva_container}>
        <Control />
        <Canvas />
      </div>
    </main>
  );
}

export default App;