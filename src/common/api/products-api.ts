import axios from "axios";

import { Product } from "../types/cart-types";
import { API_URL } from "./api-url";

export const getProductsOptions = (
  q: string
): Promise<{ products: Product[] }> =>
  axios
    .get(`${API_URL}/products/search`, {
      params: {
        q,
      },
    })
    .then(res => res.data);
