import axios from "axios";
import { Product } from "../types/cart-types";

export const getProductsOptionsToNewCart = (
  q: string
): Promise<{ products: Product[] }> =>
  axios
    .get(`https://dummyjson.com/products/search?q=${q}`)
    .then(res => res.data);
