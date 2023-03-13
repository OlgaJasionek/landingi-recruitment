import Modal from "../ui/modal/modal.component";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNewCartForm = ({ isOpen, onClose }: Props) => {
  return (
    <>
      {isOpen && (
        <Modal closeModal={onClose} headerText='Dodaj nowy koszyk'>
          <form>
            <div>blehhh</div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddNewCartForm;
