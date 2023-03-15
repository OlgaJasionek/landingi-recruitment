import { ChartData } from "chart.js";

import { Product } from "../../common/types/cart-types";
import LineChart from "../ui/line-chart/line-chart.component";
import Modal from "../ui/modal/modal.component";

// import styles from "./products-modal.module.scss";

type Props = {
  products: Product[];
  isOpen: boolean;
  closeModal: () => void;
};

const ProductsModal = ({ products, isOpen, closeModal }: Props) => {
  const chartInputData: ChartData<"line"> = {
    labels: products.map(product => product.title),
    datasets: [
      {
        label: "Cena produktu",
        data: products.map(product => product.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Cena produktu po rabacie",
        data: products.map(
          product => product.discountedPrice / product.quantity
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      {isOpen && (
        <Modal closeModal={closeModal} headerText='Produkty w koszyku'>
          <LineChart chartData={chartInputData} />
        </Modal>
      )}
    </>
  );
};

export default ProductsModal;
