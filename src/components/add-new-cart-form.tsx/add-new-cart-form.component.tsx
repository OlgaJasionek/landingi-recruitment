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
import ModalContent from "../ui/modal/modal-content/modal-content.component";
import ModalActions from "../ui/modal/modal-actions/modal-actions.component";

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

  const closeModalHandler = () => {
    onClose();
    setSelectedProducts([]);
  };

  const addNewCartHandler = () => {
    onAddNewCart(
      selectedProducts.map(product => {
        return { id: product.value, quantity: product.quantity };
      })
    );
    onClose();
    setSelectedProducts([]);
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
        <Modal closeModal={closeModalHandler} headerText='Dodaj nowy koszyk'>
          <form>
            <div className='text-label mb-1'>
              Wyszukaj produkty które chcesz dodać do koszyka
            </div>
            <AsyncSearchBar
              onSelectedValue={getSelectedProduct}
              getOptionsFn={getProductsOptions}
            />
          </form>
          <ModalContent>
            <div>
              <div className='text-label mt-2 mb-1'>
                Lista dodanych produktów
              </div>
              <ul className={styles.list}>
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
          </ModalContent>
          <ModalActions>
            <Button theme='text' onClick={closeModalHandler} text='Anuluj' />
            <Button
              theme='contained'
              onClick={() => addNewCartHandler()}
              text='Dodaj '
            />
          </ModalActions>
        </Modal>
      )}
    </>
  );
};

export default AddNewCartForm;
