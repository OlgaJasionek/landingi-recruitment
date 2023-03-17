import { ReactNode, MouseEvent } from "react";

import styles from "./icon-button.module.scss";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  name?: string;
  onClick: (event: MouseEvent) => void;
};

const IconButton = ({ children, disabled, name, onClick }: Props) => {
  return (
    <button
      aria-label={name}
      className={styles.btn}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
