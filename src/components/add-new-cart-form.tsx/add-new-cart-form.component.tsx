import axios from "axios";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Product,
  SelectedProductsToNewCart,
} from "../../common/types/cart-types";
import AsyncSearchBar from "../ui/async-search-bar/async-search-bar.component";
import Button from "../ui/button/button.component";
import Counter from "../ui/counter/counter.component";
import IconButton from "../ui/icon-button/icon-button.component";
import Modal from "../ui/modal/modal.component";

import styles from "./add-new-cart-form.module.scss";
import { SelectOption } from "../../common/types/select-options";

type Props = {
  isOpen: boolean;
  onAddNewCart: (products: SelectedProductsToNewCart[]) => Promise<void>;
  onClose: () => void;
};

const AddNewCartForm = ({ isOpen, onClose, onAddNewCart }: Props) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectOption[]>([]);

  const getSelectedProduct = (value: SelectOption) => {
    const productExistedInCart = selectedProducts.find(
      product => product.value === value.value
    );

    productExistedInCart
      ? setSelectedProducts(prev =>
          prev.map(product => {
            return product.value === productExistedInCart.value
              ? { ...product, quantity: product.quantity + 1 }
              : product;
          })
        )
      : setSelectedProducts(prev => [...prev, value]);
  };

  const deleteSelectedProduct = (id: number) => {
    setSelectedProducts(prev => prev.filter(product => product.value !== id));
  };

  const onChangeItemQuantity = (productId: number, newQuantity: number) => {
    setSelectedProducts(prevState =>
      prevState.map(product => ({
        ...product,
        quantity: product.value === productId ? newQuantity : product.quantity,
      }))
    );
  };

  const getProductsOptions = async (q: string): Promise<SelectOption[]> => {
    try {
      const resp = await axios.get(
        `https://dummyjson.com/products/search?q=${q}`
      );
      const products: Product[] = resp.data.products;
      const options: SelectOption[] = products.map(product => {
        return { value: product.id, label: product.title, quantity: 1 };
      });
      return options;
    } catch (err) {
      return [];
    }
  };

  return (
    <>
      {isOpen && (
        <Modal closeModal={onClose} headerText='Dodaj nowy koszyk'>
          <form>
            <h4>Wyszukaj produkty które chcesz dodać do koszyka</h4>
            <AsyncSearchBar
              onSelectedValue={getSelectedProduct}
              getOptionsFn={getProductsOptions}
            />
          </form>
          <div>
            <h5>Lista dodanych produktów:</h5>
            <ul>
              {selectedProducts.map(product => (
                <li className={styles.product}>
                  <span>{product.label} </span>

                  <div className={styles.actions}>
                    <Counter
                      value={product.quantity}
                      onChange={value =>
                        onChangeItemQuantity(product.value, value)
                      }
                    />
                    <IconButton
                      onClick={() => deleteSelectedProduct(product.value)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.buttons}>
            <Button theme='text' onClick={onClose} text='Anuluj' />
            <Button
              theme='contained'
              onClick={() =>
                onAddNewCart(
                  selectedProducts.map(product => {
                    return { id: product.value, quantity: product.quantity };
                  })
                )
              }
              text='Dodaj '
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddNewCartForm;
