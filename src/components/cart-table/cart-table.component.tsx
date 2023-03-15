import DeleteIcon from "@mui/icons-material/Delete";
import { Cart } from "../../common/types/cart-types";
import Button from "../ui/button/button.component";

import Card from "../ui/card/card.component";
import IconButton from "../ui/icon-button/icon-button.component";

import styles from "./cart-table.module.scss";

type Props = {
  cartList: Cart[];
  onGetCart: (id: number) => void;
  onDeleteCart: (id: number) => void;
};

const CartTable = ({ onGetCart, cartList, onDeleteCart }: Props) => {
  return (
    <>
      <Card>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.tableRow}></th>
              <th className={styles.tableRow}>Ilość produktów</th>
              <th className={styles.tableRow}>Cena koszyka</th>
              <th className={styles.tableRow}>Cena koszyka po rabacie</th>
              <th className={styles.tableRow}>
                Ilość wszystkich produktów w koszyku
              </th>

              <th className={styles.tableRow}></th>
            </tr>
          </thead>
          <tbody>
            {cartList.map(cart => (
              <tr
                key={cart.id}
                className={styles.tr}
                onClick={() => onGetCart(cart.id)}>
                <td className={styles.tableRow}>{cart.id}</td>
                <td className={styles.tableRow}>{cart.totalProducts}</td>
                <td className={styles.tableRow}>{cart.total}</td>
                <td className={styles.tableRow}>{cart.discountedTotal}</td>
                <td className={styles.tableRow}>{cart.totalQuantity}</td>

                <td className={styles.tbody}>
                  <IconButton onClick={() => onDeleteCart(cart.id)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default CartTable;
