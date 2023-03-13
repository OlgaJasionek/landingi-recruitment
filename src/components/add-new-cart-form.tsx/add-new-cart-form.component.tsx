import axios from "axios";
import { useState } from "react";

import { Product } from "../../common/types/cart-types";
import AsyncSearchBar from "../ui/async-search-bar/async-search-bar.component";
import Button from "../ui/button/button.component";
import Counter from "../ui/counter/counter.component";
import Modal from "../ui/modal/modal.component";

import styles from "./add-new-cart-form.module.scss";

type SelectOption = {
  value: string | number;
  label: string;
  quantity: number;
}; //TODO : PRZENIEŚĆ DO WSPÓLNEGO PLIKU Z TYPAMI

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNewCartForm = ({ isOpen, onClose }: Props) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectOption[]>([]);
  console.log(selectedProducts);

  const getSelectedProduct = (value: SelectOption) => {
    setSelectedProducts(prev => [...prev, value]);
  };

  const onChangeItemQuantity = (
    productId: number | string,
    newQuantity: number
  ) => {
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
                  <Counter
                    value={product.quantity}
                    onChange={value =>
                      onChangeItemQuantity(product.value, value)
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.btns}>
            <Button theme='text' onClick={() => {}} text='Anuluj' />
            <Button theme='contained' onClick={() => {}} text='Dodaj ' />
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddNewCartForm;
