import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import { NewCartProductDto } from "../../common/types/cart-types";
import AsyncSearchBar from "../ui/async-search-bar/async-search-bar.component";
import Button from "../ui/button/button.component";
import Counter from "../ui/counter/counter.component";
import IconButton from "../ui/icon-button/icon-button.component";
import Modal from "../ui/modal/modal.component";
import { SelectOption } from "../../common/types/select-options";
import ModalContent from "../ui/modal/modal-content/modal-content.component";
import ModalActions from "../ui/modal/modal-actions/modal-actions.component";
import { getProductsOptions } from "../../common/api/products-api";

import styles from "./add-new-cart-form.module.scss";

type Props = {
  isOpen: boolean;
  onAddNewCart: (products: NewCartProductDto[]) => Promise<void>;
  onClose: () => void;
};

const AddNewCartForm = ({ isOpen, onClose, onAddNewCart }: Props) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectOption[]>([]);

  const loadProductsOptions = async (q: string): Promise<SelectOption[]> => {
    try {
      const resp = await getProductsOptions(q);
      const products = resp.products;
      const options = products.map(product => {
        return { value: product.id, label: product.title, quantity: 1 };
      });
      return options;
    } catch (err) {
      return [];
    }
  };

  const selectProductHandler = (value: SelectOption) => {
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

  const onChangeItemQuantity = (productId: number, newQuantity: number) => {
    setSelectedProducts(prevState =>
      prevState.map(product => ({
        ...product,
        quantity: product.value === productId ? newQuantity : product.quantity,
      }))
    );
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
    closeModalHandler();
  };

  const deleteSelectedProduct = (id: number) => {
    setSelectedProducts(prev => prev.filter(product => product.value !== id));
  };

  return (
    <>
      {isOpen && (
        <Modal closeModal={closeModalHandler} headerText='Dodaj nowy koszyk'>
          <form>
            <div className='text-label mb-1'>
              Wpisz nazwę produktu który chcesz dodać do koszyka
            </div>
            <AsyncSearchBar
              onSelectValue={selectProductHandler}
              getOptionsFn={loadProductsOptions}
            />
          </form>
          <ModalContent>
            <div>
              <div className='text-label mt-2 mb-1'>
                Lista dodanych produktów
              </div>
              <ul className={styles.list}>
                {selectedProducts.map(product => (
                  <li key={product.value} className={styles.product}>
                    <span>{product.label}</span>
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
            <Button theme='text' text='Anuluj' onClick={closeModalHandler} />
            <Button
              theme='contained'
              text='Dodaj '
              onClick={() => addNewCartHandler()}
            />
          </ModalActions>
        </Modal>
      )}
    </>
  );
};

export default AddNewCartForm;
