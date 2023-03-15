import axios from "axios";
import { Product } from "../types/cart-types";

export const getProductsOptions = (
  q: string
): Promise<{ products: Product[] }> =>
  axios
    .get(`https://dummyjson.com/products/search`, {
      params: {
        q,
      },
    })
    .then(res => res.data);
