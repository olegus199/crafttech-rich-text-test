import styles from "./popupContainer.module.scss";
import { FC, JSX, useEffect } from "react";

interface PopupContainerProps {
  children: JSX.Element;
}

const PopupContainer: FC<PopupContainerProps> = ({ children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default PopupContainer;