import classnames from "classnames";
import styles from "./button.module.scss";

type Props = {
  theme: "outline" | "contained" | "text";
  onClick: () => void;
  text: string;
};

const Button = ({ theme, onClick, text }: Props) => {
  return (
    <button onClick={onClick} className={classnames(styles.btn, styles[theme])}>
      {text}
    </button>
  );
};

export default Button;
