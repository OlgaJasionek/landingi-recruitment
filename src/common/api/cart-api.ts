import axios from "axios";

import { API_URL } from "./api-url";
import { Cart, Product, NewCartProductDto } from "../types/cart-types";

export const getCartsData = (): Promise<{ carts: Cart[] }> =>
  axios.get(`${API_URL}/carts`).then(res => res.data);

export const getOneCartData = (id: number): Promise<{ products: Product[] }> =>
  axios.get(`${API_URL}/carts/${id}`).then(res => res.data);

export const deleteCart = (id: number): Promise<{ id: number }> =>
  axios.delete(`${API_URL}/carts/${id}`).then(res => res.data);

export const addNewCart = (products: NewCartProductDto[]): Promise<Cart> =>
  axios
    .post(`${API_URL}/carts/add`, {
      userId: 1,
      products,
    })
    .then(res => res.data);
