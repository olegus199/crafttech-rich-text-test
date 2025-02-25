import styles from "../LexicalEditor.module.scss";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from "lexical";
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store.ts";
import TextFormatPopup from "../UI/TextFormatPopup.tsx";
import useHelpers from "../../../hooks/useHelpers";
import {
  CustomTextFormatType,
  SelectedTextFormat, TextFormatPopupProps,
  TextFormatRefs,
  TextFromatHints,
} from "../../../types.ts";
import {
  selectedTextFormatChanged,
  selectedTextFormatReset,
} from "../../../state/selectedTextFormatSlice.ts";

const textFormatHints: TextFromatHints = {
  bold: "жирный",
  code: "код",
  highlight: "выделенный",
  italic: "курсив",
  link: "ссылка",
  restore: "отменить форматирование",
  strikethrough: "перечеркнутый",
  subscript: "нижний индекс",
  superscript: "верхний индекс",
  underline: "подчеркивание",
  uppercase: "заглавные буквы",
  lowercase: "строчные буквы",
  capitalize: "",
};

const formatTypes: TextFormatType[] = [
  "bold",
  "italic",
  "underline",
  "code",
  "highlight",
  "strikethrough",
  "subscript",
  "superscript",
];

const CustomTextActions: FC = () => {
  const [editor] = useLexicalComposerContext();
  const dispatch = useDispatch();
  const { renderTextOrIcon } = useHelpers();

  const selectedTextFormat = useSelector<RootState, SelectedTextFormat>(
    (state) => state.selectedTextFormat.selectedTextFormat,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const textFormatRefs: TextFormatRefs = {
    bold: useRef(null),
    code: useRef(null),
    highlight: useRef(null),
    italic: useRef(null),
    link: useRef(null),
    restore: useRef(null),
    strikethrough: useRef(null),
    subscript: useRef(null),
    superscript: useRef(null),
    underline: useRef(null),
    capitalize: useRef(null),
    lowercase: useRef(null),
    uppercase: useRef(null),
  };

  const [formatPopup, setFormatPopup] = useState<TextFormatPopupProps | null>(
    null,
  );

  function handleClick(formatType: CustomTextFormatType): void {
    if (formatType === "link") {
      // showLinkPopup();
    } else if (formatType === "restore") {
      clearFormat();
    } else {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
    }

    if (formatType === "restore") {
      dispatch(selectedTextFormatReset());
    } else {
      dispatch(
        selectedTextFormatChanged({
          ...selectedTextFormat,
          [formatType]: !selectedTextFormat[formatType],
        }),
      );
    }
  }

  function clearFormat(): void {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if ($isTextNode(node)) {
            node.setFormat(0);
          }
        });
      }
    });
  }

  // function showLinkPopup(): void {
  //   dispatch(setLinkPopup(true));
  // }

  // Event listeners
  useEffect(() => {
    function handleMouseEnter(e: MouseEvent): void {
      const htmlElement = e.target;
      const container = containerRef.current;

      if (!(htmlElement instanceof HTMLElement) || !container) {
        return;
      }

      const hint = htmlElement.getAttribute("data-hint");

      if (!hint) {
        return;
      }

      const elementRect = htmlElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setFormatPopup({
        dimensions: {
          top: elementRect.height + 15,
          left: elementRect.left + elementRect.width / 2 - containerRect.left,
        },
        message: hint,
      });
    }

    Object.values(textFormatRefs).forEach((ref) => {
      ref.current?.addEventListener("mouseenter", handleMouseEnter);
    });
    Object.values(textFormatRefs).forEach((ref) => {
      ref.current?.addEventListener("mouseleave", () => {
        setFormatPopup(null);
      });
    });

    return () => {
      Object.values(textFormatRefs).forEach((ref) => {
        ref.current?.removeEventListener("mouseenter", handleMouseEnter);
      });
      Object.values(textFormatRefs).forEach((ref) => {
        ref.current?.addEventListener("mouseleave", () => {
          setFormatPopup(null);
        });
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.text_actions_container}
    >
      {formatPopup && (
        <TextFormatPopup
          key={Math.random()}
          dimensions={formatPopup.dimensions}
          message={formatPopup.message}
        />
      )}
      {formatTypes.map((formatType, idx) => (
        <button
          ref={textFormatRefs[formatType]}
          data-hint={textFormatHints[formatType]}
          key={idx}
          onClick={() => handleClick(formatType)}
          className={`${styles.toolbar_button} ${styles.button_text_format} ${
            selectedTextFormat[formatType] && styles.text_format_active
          }`}
        >
          {renderTextOrIcon({ kind: "textFormat", tag: formatType }).icon}
        </button>
      ))}
      {/*<button*/}
      {/*  ref={textFormatRefs.link}*/}
      {/*  data-hint={textFormatHints.link}*/}
      {/*  onClick={() => handleClick("link")}*/}
      {/*  className={`${styles.toolbar_button} ${styles.button_text_format} ${styles.text_format_active}`}*/}
      {/*>*/}
      {/*  {renderTextOrIcon({ kind: "textFormat", tag: "link" }).icon}*/}
      {/*</button>*/}
      <button
        ref={textFormatRefs.restore}
        data-hint={textFormatHints.restore}
        onClick={() => handleClick("restore")}
        className={`${styles.toolbar_button} ${styles.button_text_format} ${
          selectedTextFormat["restore"] && styles.text_format_active
        }`}
      >
        {renderTextOrIcon({ kind: "textFormat", tag: "restore" }).icon}
      </button>
    </div>
  );
};

export default CustomTextActions;