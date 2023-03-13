import { ReactNode } from "react";

import styles from "./icon-button.module.scss";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

const IconButton = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.iconBtn}>
      {children}
    </button>
  );
};

export default IconButton;
