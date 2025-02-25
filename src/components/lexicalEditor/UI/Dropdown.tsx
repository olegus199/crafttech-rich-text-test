import styles from "../LexicalEditor.module.scss";
import { useSelector } from "react-redux";
import { FC, PropsWithChildren } from "react";
import { RootState } from "../../../state/store.ts";
import { CurrentlyVisibleDropdown } from "../../../types.ts";

interface DropdownProps {
  kind: CurrentlyVisibleDropdown;
}

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({ kind, children }) => {
  const currentlyVisibleDropdown = useSelector<
    RootState,
    CurrentlyVisibleDropdown
  >((state) => state.dropdownVisibility.currentlyVisible);
  const dropdownDimensions = useSelector<RootState, number>(
    (state) => state.dropdownDimensions.top,
  );

  return (
    <div
      style={{ top: `${dropdownDimensions / 16}rem` }}
      className={`${styles.dropdown} ${
        currentlyVisibleDropdown === kind && styles.dropdown_visible
      }`}
    >
      <div className={styles.dropdown_content}>{children}</div>
    </div>
  );
};

export default Dropdown;