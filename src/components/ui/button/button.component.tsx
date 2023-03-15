import classnames from "classnames";

import styles from "./button.module.scss";

type Props = {
  theme: "outline" | "contained" | "text";
  text: string;
  onClick: () => void;
};

const Button = ({ theme, text, onClick }: Props) => {
  return (
    <button onClick={onClick} className={classnames(styles.btn, styles[theme])}>
      {text}
    </button>
  );
};

export default Button;
