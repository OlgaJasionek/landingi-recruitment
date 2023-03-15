import { useEffect, useState } from "react";

import ProductsModal from "../products-details-modal/products-details-modal.component";
import {
  Cart,
  Product,
  SelectedProductsToNewCart,
} from "../../common/types/cart-types";
import CartTable from "../cart-list-table/cart-list-table.component";
import Button from "../ui/button/button.component";
import AddNewCartForm from "../add-new-cart-form.tsx/add-new-cart-form.component";
import Loader from "../ui/loader/loader.component";
import Snackbar from "../ui/snackbar/snackbar.component";
import {
  addNewCart,
  deleteCart,
  getCartListData,
  getOneCartData,
} from "../../common/api/cart-api";

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
      const resp = await getCartListData();

      setCartList(resp.carts);
    } catch (err) {}
    setInitLoading(false);
  };

  const getOneCartHandler = async (id: number) => {
    try {
      if (id) {
        const resp = await getOneCartData(id);

        setProducts(resp.products);
        setOpenProductsModal(true);
      }
    } catch (err) {
      setSnacbarText("Nie znaleziono koszyka z takim id");
      setOpenErrorSnackbar(true);
    }
  };

  const deleteCartHandler = async (id: number) => {
    try {
      const resp = await deleteCart(id);
      const deletedCartId = resp.id;

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
      const newCart = await addNewCart(products);

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
          products={products}
          isOpen={openProductsModal}
          closeModal={closeProductsModalHandler}
        />
        <AddNewCartForm
          isOpen={openAddNewCartModal}
          onClose={closeAddCartModalHandler}
          onAddNewCart={addNewCartHandler}
        />
        <Snackbar
          color='success'
          open={openSuccessSnackBar}
          text={snackbarText}
          handleClose={() => setOpenSuccessSnackbar(false)}
        />
        <Snackbar
          color='error'
          open={openErrorSnackBar}
          text={snackbarText}
          handleClose={() => setOpenErrorSnackbar(false)}
        />
      </section>
    </>
  );
};

export default CartList;
