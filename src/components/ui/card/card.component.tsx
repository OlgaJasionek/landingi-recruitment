import { ReactNode } from "react";

import styles from "./card.module.scss";

type Props = {
  children: ReactNode;
};

const Card = ({ children }: Props) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
