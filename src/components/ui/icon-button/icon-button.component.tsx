import { ReactNode, MouseEvent } from "react";

import styles from "./icon-button.module.scss";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  onClick: (event: MouseEvent) => void;
};

const IconButton = ({ children, disabled, onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.btn} disabled={disabled}>
      {children}
    </button>
  );
};

export default IconButton;
