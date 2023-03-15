import CloseIcon from "@mui/icons-material/Close";
import IconButton from "../icon-button/icon-button.component";

import styles from "./modal.module.scss";

type Props = {
  children: React.ReactNode;
  headerText: string;
  closeModal: () => void;
};

const Modal = ({ children, closeModal, headerText }: Props) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h3>{headerText}</h3>
              <div className={styles.closeBtn}>
                <IconButton onClick={() => closeModal()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
