import styles from "../LexicalEditor.module.scss";
import { FC } from "react";
import useHelpers from "../../../hooks/useHelpers";
import { FaChevronDown } from "react-icons/fa6";
import { CurrentlyVisibleDropdown } from "../../../types.ts";
import { useAppSelector } from "../../../hooks/redux-hooks.tsx";
import { selectCurrentlyVisibleDropdown } from "../../../state/dropdownVisibilitySlice.ts";
import {
  selectActiveAlignment,
  selectActiveHeading,
} from "../../../state/activeDropdownOptionSlice.ts";

interface DropdownToggleButtonProps {
  kind: NonNullable<CurrentlyVisibleDropdown>;
}

const DropdownToggleButton: FC<DropdownToggleButtonProps> = ({ kind }) => {
  const { handleDropdownToggleClick, renderTextOrIcon } = useHelpers();

  const currentlyVisibleDropdown = useAppSelector(selectCurrentlyVisibleDropdown);
  const activeHeading = useAppSelector(selectActiveHeading);
  const activeAlignment = useAppSelector(selectActiveAlignment);

  return (
    <button
      onClick={() => handleDropdownToggleClick(kind)}
      className={`${styles.toolbar_button} ${styles.dropdown_toggle_button} ${
        currentlyVisibleDropdown === kind && styles.dropdown_toggle_toggled
      }`}
    >
      {kind === "align" &&
        renderTextOrIcon({ kind: "align", tag: activeAlignment }).icon}
      {kind === "heading" &&
        renderTextOrIcon({ kind: "heading", tag: activeHeading }).icon}
      {kind === "insert" && renderTextOrIcon({ kind: "insert", tag: "" }).icon}
      <p className={styles.dropdown_toggle_p}>
        {kind === "align" &&
          renderTextOrIcon({ kind: "align", tag: activeAlignment }).text}
        {kind === "heading" &&
          renderTextOrIcon({ kind: "heading", tag: activeHeading }).text}
        {kind === "insert" &&
          renderTextOrIcon({ kind: "insert", tag: "" }).text}
      </p>
      <FaChevronDown className={styles.dropdown_toggle_chevron} />
    </button>
  );
};

export default DropdownToggleButton;