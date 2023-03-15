import DeleteIcon from "@mui/icons-material/Delete";
import { MouseEvent } from "react";

import { Cart } from "../../common/types/cart-types";
import Card from "../ui/card/card.component";
import IconButton from "../ui/icon-button/icon-button.component";

import styles from "./cart-table.module.scss";

type Props = {
  carts: Cart[];
  onGetCart: (id: number) => void;
  onDeleteCart: (id: number) => void;
};

const CartTable = ({ carts, onGetCart, onDeleteCart }: Props) => {
  const deleteCartHandler = (event: MouseEvent, cartId: number) => {
    onDeleteCart(cartId);
    event.stopPropagation();
  };

  return (
    <>
      <Card>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Ilość produktów</th>
              <th>Cena koszyka</th>
              <th>Cena koszyka po rabacie</th>
              <th>Ilość wszystkich produktów w koszyku</th>
              <th className={styles.tableRow}></th>
            </tr>
          </thead>
          <tbody>
            {carts.map(cart => (
              <tr
                key={cart.id}
                className={styles.tr}
                onClick={() => onGetCart(cart.id)}>
                <td>{cart.id}</td>
                <td>{cart.totalProducts}</td>
                <td>{cart.total}</td>
                <td>{cart.discountedTotal}</td>
                <td>{cart.totalQuantity}</td>
                <td>
                  <IconButton
                    onClick={event => deleteCartHandler(event, cart.id)}>
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
