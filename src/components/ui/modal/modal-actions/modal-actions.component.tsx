import { ReactNode } from "react";

import styles from "./modal-actions.module.scss";

type Props = {
  children: ReactNode;
};

const ModalActions = ({ children }: Props) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default ModalActions;
