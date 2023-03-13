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
              <th className={styles.theader}></th>
              <th className={styles.theader}>Ilość produktów</th>
              <th className={styles.theader}>Cena koszyka</th>
              <th className={styles.theader}>Cena koszyka po rabacie</th>
              <th className={styles.theader}>
                Ilość wszystkich produktów w koszyku
              </th>
              <th className={styles.theader}>Produkty w koszyku</th>

              <th className={styles.theader}></th>
            </tr>
          </thead>
          <tbody>
            {cartList.map(cart => (
              <tr key={cart.id}>
                <td className={styles.tbody}>{cart.id}</td>
                <td className={styles.tbody}>{cart.totalProducts}</td>
                <td className={styles.tbody}>{cart.total}</td>
                <td className={styles.tbody}>{cart.discountedTotal}</td>
                <td className={styles.tbody}>{cart.totalQuantity}</td>
                <td className={styles.tbody}>
                  <Button
                    onClick={() => onGetCart(cart.id)}
                    theme='text'
                    text='Pokaż'></Button>
                </td>
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
