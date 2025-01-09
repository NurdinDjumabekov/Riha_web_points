//// hooks
import { useEffect } from "react";

///// componenst
import Modals from "../Modals/Modals";

//// styles
import "./style.scss";

const ConfirmationModal = ({ visible, message, onYes, onNo, onClose }) => {
  function handleKeyDown(e) {
    if (e.key == "Escape") onClose();
    if (e.key == "Enter") onYes();
  }

  useEffect(() => {
    if (visible) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

  return (
    <Modals openModal={visible} setOpenModal={onClose}>
      <div onClick={onClose}>
        <div className="parentConf">
          <div className="containerActions">
            <h6>{message}</h6>
            <div className="buttonContainer">
              <button onClick={onYes} className="btnsGood">
                Да
              </button>
              <div onClick={onNo} className="btnsNoo">
                Нет
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modals>
  );
};

export default ConfirmationModal;
