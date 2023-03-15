import axios from "axios";
import { useEffect, useState } from "react";

import ProductsModal from "../products-modal/products-modal.component";
import {
  Cart,
  Product,
  SelectedProductsToNewCart,
} from "../../common/types/cart-types";
import CartTable from "../cart-table/cart-table.component";
import Button from "../ui/button/button.component";
import AddNewCartForm from "../add-new-cart-form.tsx/add-new-cart-form.component";
import Loader from "../ui/loader/loader.component";
import Snackbar from "../ui/snackbar/snackbar.component";

// import styles from "./cart-list.module.scss";

const CartList = () => {
  const [cartList, setCartList] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [openProductsModal, setOpenProductsModal] = useState(false);
  const [openAddNewCartModal, setOpenAddNewCartModal] = useState(false);

  const [openSuccessSnackBar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackBar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [snackbarText, setSnacbarText] = useState<string>("");

  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = async () => {
    try {
      const data = await axios.get("https://dummyjson.com/carts");
      setCartList(data.data.carts);
    } catch (err) {}
    setInitLoading(false);
  };

  const getOneCartHandler = async (id: number) => {
    try {
      if (id) {
        const data = await axios.get(`https://dummyjson.com/carts/${id}`);
        setProducts(data.data.products);
        setOpenProductsModal(true);
      }
    } catch (err) {
      setSnacbarText("Nie znaleziono koszyka z takim id");
      setOpenErrorSnackbar(true);
    }
  };

  const deleteCartHandler = async (id: number) => {
    try {
      const data = await axios.delete(`https://dummyjson.com/carts/${id}`);
      const deletedCartId = data.data.id;
      setCartList(prev => prev.filter(cart => cart.id !== deletedCartId));
      setSnacbarText("Pomyślnie usunięto koszyk");
      setOpenSuccessSnackbar(true);
    } catch (err) {
      setSnacbarText("Nie możesz usunąć tego koszyka");
      setOpenErrorSnackbar(true);
    }
  };

  const addNewCartHandler = async (products: SelectedProductsToNewCart[]) => {
    try {
      const data = await axios.post("https://dummyjson.com/carts/add", {
        userId: 1,
        products: products,
      });
      const newCart = data.data;

      setCartList(prev => [...prev, newCart]);
      setSnacbarText("Pomyślnie dodano nowy koszyk");
      setOpenSuccessSnackbar(true);
    } catch (err) {
      setSnacbarText("Nie możesz dodać koszyka bez produktów");
      setOpenErrorSnackbar(true);
    }
  };

  const closeProductsModalHandler = () => {
    setOpenProductsModal(false);
  };

  const openAddCartModalHandler = () => {
    setOpenAddNewCartModal(true);
  };

  const closeAddCartModalHandler = () => {
    setOpenAddNewCartModal(false);
  };

  return (
    <>
      <section className='container'>
        <div className='header'>
          <Button
            theme='contained'
            onClick={() => openAddCartModalHandler()}
            text='Dodaj nowy koszyk'
          />
        </div>
        {initLoading ? (
          <Loader />
        ) : (
          <CartTable
            cartList={cartList}
            onGetCart={getOneCartHandler}
            onDeleteCart={deleteCartHandler}
          />
        )}

        <ProductsModal
          closeModal={closeProductsModalHandler}
          products={products}
          isOpen={openProductsModal}
        />
        <AddNewCartForm
          onClose={closeAddCartModalHandler}
          isOpen={openAddNewCartModal}
          onAddNewCart={addNewCartHandler}
        />
        <Snackbar
          open={openSuccessSnackBar}
          handleClose={() => setOpenSuccessSnackbar(false)}
          text={snackbarText}
          color='success'
        />
        <Snackbar
          open={openErrorSnackBar}
          handleClose={() => setOpenErrorSnackbar(false)}
          text={snackbarText}
          color='error'
        />
      </section>
    </>
  );
};

export default CartList;
