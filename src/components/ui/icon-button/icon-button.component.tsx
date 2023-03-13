import { ReactNode } from "react";

import styles from "./icon-button.module.scss";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

const IconButton = ({ children, disabled, onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.iconBtn} disabled={disabled}>
      {children}
    </button>
  );
};

export default IconButton;
