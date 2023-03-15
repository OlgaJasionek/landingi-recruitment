import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import IconButton from "../icon-button/icon-button.component";
import styles from "./counter.module.scss";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const Counter = ({ value, onChange }: Props) => {
  const increment = () => {
    onChange(value + 1);
  };

  const decrement = () => {
    value > 1 && onChange(value - 1);
  };

  return (
    <div className={styles.counter}>
      <IconButton onClick={decrement} disabled={value === 1}>
        <RemoveIcon />
      </IconButton>
      <div className={styles.quantity}>{value}</div>
      <IconButton onClick={increment}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default Counter;
