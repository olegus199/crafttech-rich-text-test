import styles from "../components/lexicalEditor/LexicalEditor.module.scss";
import { useDispatch } from "react-redux";
import { PiHighlighterFill, PiParagraphBold } from "react-icons/pi";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaIndent,
  FaOutdent,
  FaPlus,
} from "react-icons/fa6";
import { RxFontBold, RxFontItalic } from "react-icons/rx";
import {
  TbRestore,
  TbStrikethrough,
  TbSubscript,
  TbSuperscript,
  TbUnderline,
} from "react-icons/tb";
import { LuCode } from "react-icons/lu";
import { IoLink } from "react-icons/io5";
import { CurrentlyVisibleDropdown, RenderTextOrIcon } from "../types.ts";
import { useAppSelector } from "./redux-hooks.tsx";
import {
  currentlyVisibleDropdownChanged,
  selectCurrentlyVisibleDropdown,
} from "../state/dropdownVisibilitySlice.ts";

const useHelpers = () => {
  const dispatch = useDispatch();

  const currentlyVisibleDropdown = useAppSelector(selectCurrentlyVisibleDropdown);

  function handleDropdownToggleClick(payload: CurrentlyVisibleDropdown) {
    if (currentlyVisibleDropdown) {
      if (currentlyVisibleDropdown === payload) {
        dispatch(currentlyVisibleDropdownChanged(null));
        return;
      }
    }

    dispatch(currentlyVisibleDropdownChanged(payload));
  }

  const renderTextOrIcon: RenderTextOrIcon = (payload) => {
    switch (payload.kind) {
      case "heading":
        switch (payload.tag) {
          case "h1":
            return {
              text: "Заголовок 1",
              icon: <p className={styles.dropdown_toggle_icon}>H1</p>,
            };
          case "h2":
            return {
              text: "Заголовок 2",
              icon: <p className={styles.dropdown_toggle_icon}>H2</p>,
            };
          case "h3":
            return {
              text: "Заголовок 3",
              icon: <p className={styles.dropdown_toggle_icon}>H3</p>,
            };
          case "h4":
            return {
              text: "Заголовок 4",
              icon: <p className={styles.dropdown_toggle_icon}>H4</p>,
            };
          case "h5":
            return {
              text: "Заголовок 5",
              icon: <p className={styles.dropdown_toggle_icon}>H5</p>,
            };
          case "h6":
            return {
              text: "Заголовок 6",
              icon: <p className={styles.dropdown_toggle_icon}>H6</p>,
            };
          case "paragraph":
            return {
              text: "Параграф",
              icon: <PiParagraphBold className={styles.dropdown_toggle_icon} />,
            };
        }
        break;
      case "align":
        switch (payload.tag) {
          case "left":
            return {
              text: "Левый край",
              icon: <FaAlignLeft className={styles.dropdown_toggle_icon} />,
            };
          case "center":
            return {
              text: "Центр",
              icon: <FaAlignCenter className={styles.dropdown_toggle_icon} />,
            };
          case "right":
            return {
              text: "Правый край",
              icon: <FaAlignRight className={styles.dropdown_toggle_icon} />,
            };
          case "justify":
            return {
              text: "По ширине",
              icon: <FaAlignJustify className={styles.dropdown_toggle_icon} />,
            };
          case "outdent":
            return {
              text: "Отступ справа",
              icon: <FaOutdent className={styles.dropdown_toggle_icon} />,
            };
          case "indent":
            return {
              text: "Отступ слева",
              icon: <FaIndent className={styles.dropdown_toggle_icon} />,
            };
          default:
            return { text: "", icon: <></> };
        }
      case "insert":
        return {
          text: "Вставить",
          icon: <FaPlus className={styles.dropdown_toggle_icon} />,
        };
      case "textFormat":
        switch (payload.tag) {
          case "bold":
            return {
              icon: <RxFontBold className={styles.toolbar_icon} />,
              text: "",
            };
          case "underline":
            return {
              icon: <TbUnderline className={styles.toolbar_icon} />,
              text: "",
            };
          case "strikethrough":
            return {
              icon: <TbStrikethrough className={styles.toolbar_icon} />,
              text: "",
            };
          case "italic":
            return {
              icon: <RxFontItalic className={styles.toolbar_icon} />,
              text: "",
            };
          case "highlight":
            return {
              icon: <PiHighlighterFill className={styles.toolbar_icon} />,
              text: "",
            };
          case "code":
            return {
              icon: <LuCode className={styles.toolbar_icon} />,
              text: "",
            };
          case "subscript":
            return {
              icon: <TbSubscript className={styles.toolbar_icon} />,
              text: "",
            };
          case "superscript":
            return {
              icon: <TbSuperscript className={styles.toolbar_icon} />,
              text: "",
            };
          case "link":
            return {
              icon: <IoLink className={styles.toolbar_icon} />,
              text: "",
            };
          case "restore":
            return {
              icon: <TbRestore className={styles.toolbar_icon} />,
              text: "",
            };
          default:
            return { text: "", icon: <></> };
        }
      default:
        return { text: "", icon: <></> };
    }
  };

  return {
    handleDropdownToggleClick,
    renderTextOrIcon,
  };
};

export default useHelpers;