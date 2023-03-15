import { ChartData } from "chart.js";

import { Product } from "../../common/types/cart-types";
import LineChart from "../ui/line-chart/line-chart.component";
import ModalContent from "../ui/modal/modal-content/modal-content.component";
import Modal from "../ui/modal/modal.component";

type Props = {
  products: Product[];
  isOpen: boolean;
  closeModal: () => void;
};

const ProductsDetailsModal = ({ products, isOpen, closeModal }: Props) => {
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
          <ModalContent>
            <LineChart chartData={chartInputData} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ProductsDetailsModal;
