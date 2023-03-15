import axios from "axios";
import { Cart, Product, NewCartProductDto } from "../types/cart-types";

export const getCartsData = (): Promise<{ carts: Cart[] }> =>
  axios.get("https://dummyjson.com/carts").then(res => res.data);

export const getOneCartData = (id: number): Promise<{ products: Product[] }> =>
  axios.get(`https://dummyjson.com/carts/${id}`).then(res => res.data);

export const deleteCart = (id: number): Promise<{ id: number }> =>
  axios.delete(`https://dummyjson.com/carts/${id}`).then(res => res.data);

export const addNewCart = (products: NewCartProductDto[]): Promise<Cart> =>
  axios
    .post("https://dummyjson.com/carts/add", {
      userId: 1,
      products,
    })
    .then(res => res.data);
