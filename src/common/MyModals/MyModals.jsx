import "./style.scss";
import krest from "../../assets/icons/krest.svg";
import { useEffect } from "react";

const MyModals = (props) => {
  const { openModal, children, closeModal, title } = props;
  const closeModalFN = () => closeModal();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key == "Escape") closeModalFN();
    };
    if (openModal) {
      document.body.style.overflow = "hidden";
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal]);

  if (openModal) {
    return (
      <div className="myModals">
        <div className="myModals__shadow" onClick={closeModalFN}></div>
        <div className="myModals__inner">
          <h6>{title}</h6>
          <button className="krest" onClick={closeModalFN}>
            <img src={krest} alt="x" />
          </button>
          <div className="content">{children}</div>
        </div>
      </div>
    );
  }
};

export default MyModals;
