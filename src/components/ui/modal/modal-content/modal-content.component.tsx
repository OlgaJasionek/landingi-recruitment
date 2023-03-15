import { ReactNode } from "react";

import styles from "./modal-content.module.scss";
type Props = {
  children: ReactNode;
};

const ModalContent = ({ children }: Props) => {
  return <div className={styles.content}>{children}</div>;
};

export default ModalContent;
