import styles from "./TextFormatPopup.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import { TextFormatPopupProps } from "../../../types.ts";

const TextFormatPopup: FC<TextFormatPopupProps> = ({ message, dimensions }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupWidth, setPopupWidth] = useState(0);

  useEffect(() => {
    if (popupRef.current) {
      setPopupWidth(popupRef.current.getBoundingClientRect().width);
    }
  }, [dimensions]);

  return (
    <div
      ref={popupRef}
      style={{
        top: `${dimensions.top / 16}rem`,
        left: `${(dimensions.left - popupWidth / 2) / 16}rem`,
      }}
      className={styles.popup}
    >
      {message}
    </div>
  );
};

export default TextFormatPopup;