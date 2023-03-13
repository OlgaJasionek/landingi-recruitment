import { Product } from "../../common/types/cart-types";
import Modal from "../ui/modal/modal.component";

type Props = {
  products: Product[];
  isOpen: boolean;
  closeModal: () => void;
};

const ProductsModal = ({ products, isOpen, closeModal }: Props) => {
  return (
    <>
      {isOpen && (
        <Modal closeModal={closeModal} headerText='Lista produktów'>
          <header>Produkty w koszyku</header>
          <main>
            {products.map(product => (
              <div key={product.id}>
                {product.title} <span>{product.price}</span>
              </div>
            ))}
          </main>
        </Modal>
      )}
    </>
  );
};

export default ProductsModal;
