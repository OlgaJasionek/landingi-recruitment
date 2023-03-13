import axios from "axios";
import { useEffect, useState } from "react";

import ProductsModal from "../products-modal/products-modal.component";
import { Cart, Product } from "../../common/types/cart-types";
import CartTable from "../cart-table/cart-table.component";

import styles from "./cart-list.module.scss";
import Button from "../ui/button/button.component";
import AddNewCartForm from "../add-new-cart-form.tsx/add-new-cart-form.component";

const CartList = () => {
  const [cartList, setCartList] = useState<Cart[]>([]);
  const [openProductsModal, setOpenProductsModal] = useState(false);
  const [openAddNewCartModal, setOpenAddNewCartModal] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = async () => {
    try {
      const data = await axios.get("https://dummyjson.com/carts");
      setCartList(data.data.carts);
    } catch (err) {}
  };

  const getOneCartHandler = async (id: number) => {
    try {
      if (id) {
        const data = await axios.get(`https://dummyjson.com/carts/${id}`);
        setProducts(data.data.products);
        setOpenProductsModal(true);
      }
    } catch (err) {}
  };

  const deleteCartHandler = async (id: number) => {
    const data = await axios.delete(`https://dummyjson.com/carts/${id}`);
    const deletedCartId = data.data.id;
    setCartList(prev => prev.filter(cart => cart.id !== deletedCartId));
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
            text='DODAJ NOWY KOSZYK'
          />
        </div>
        <CartTable
          cartList={cartList}
          onGetCart={getOneCartHandler}
          onDeleteCart={deleteCartHandler}
        />
        <ProductsModal
          closeModal={closeProductsModalHandler}
          products={products}
          isOpen={openProductsModal}
        />
        <AddNewCartForm
          onClose={closeAddCartModalHandler}
          isOpen={openAddNewCartModal}
        />
      </section>
    </>
  );
};

export default CartList;
