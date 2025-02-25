import styles from "./App.module.scss";
import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import LexicalEditor from "./components/lexicalEditor/LexicalEditor.tsx";
import { useAppSelector } from "./hooks/redux-hooks.tsx";
import { selectEditorParams } from "./state/editorVisibleSlice.ts";
import PopupContainer from "./components/PopupContainer.tsx";
import { selectParamsEditing } from "./state/editFigureParamsSlice.ts";
import ParamsEditor from "./components/ParamsEditor.tsx";

function App() {
  const isEditorVisible = useAppSelector(selectEditorParams).isVisible;
  const paramsEditing = useAppSelector(selectParamsEditing);

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Crafftech rich text</h1>
      {isEditorVisible && (
        <PopupContainer>
          <LexicalEditor />
        </PopupContainer>
      )}
      {paramsEditing && (
        <PopupContainer>
          <ParamsEditor />
        </PopupContainer>
      )}
      <div className={styles.konva_container}>
        <Control />
        <Canvas />
      </div>
    </main>
  );
}

export default App;