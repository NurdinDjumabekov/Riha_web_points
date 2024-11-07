/////hooks
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////imgs
import searchIcon from "../../assets/icons/searchIcon.png";
import qrCode from "../../assets/icons/qr_code.png";
import inputIcon from "../../assets/icons/inputIcon.png";

///// fns
import { getEveryProd } from "../../store/reducers/requestSlice";
import { useNavigate } from "react-router-dom";

///// components
import Modals from "../Modals/Modals";

///// style
import "./style.scss";

const SaleMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refInput = useRef();

  const { data } = useSelector((state) => state.saveDataSlice);

  const [obj, setObj] = useState({ qrcode: "", seller_guid: "" });

  const navQRCode = () => navigate("/sale/scanner");
  ///// перехожу на страницу сканера

  const navSearch = () => navigate("/sale/search");

  const navInputQrCode = () => {
    setObj({ ...obj, seller_guid: data?.seller_guid });
    ////// открываю модалку для вводa ЦИФР QRCode

    setTimeout(() => {
      refInput?.current?.focus();
    }, 500);
  };

  const closeModal = () => setObj({ qrcode: "", seller_guid: "" });

  const onChange = (e) => {
    const text = e.target.value;

    if (/^[0-9]*$/.test(text)) {
      setObj({ ...obj, qrcode: text });
    }
  };

  const sendData = () => {
    if (obj?.qrcode?.length != 6) {
      alert("Введите 6ти значный код товара");
    } else {
      const sendData = { qrcode: obj?.qrcode, seller_guid: data?.seller_guid };
      dispatch(getEveryProd({ ...sendData, navigate, closeModal }));
    }
  };

  return (
    <>
      {/* ///// menu  */}
      <div className="blockMenuActions">
        <button onClick={navSearch}>
          <img src={searchIcon} alt="search" />
          <p>Поиск</p>
        </button>
        <button className="blockBtn_inner_QR" onClick={navQRCode}>
          <img src={qrCode} alt="qrCode" />
        </button>
        <button onClick={navInputQrCode}>
          <img src={inputIcon} alt="inputIcon" />
          <p>Ввод</p>
        </button>
      </div>

      {/* /////////////////// modalka /////////////////// */}
      <Modals openModal={!!obj?.seller_guid} setOpenModal={closeModal}>
        <div className="modalInnerQR">
          <h4>Введите 6ти значный QR Code товара</h4>
          <input
            value={obj?.qrcode}
            onChange={onChange}
            placeholder="763546"
            maxLength={6}
            ref={refInput}
          />
          <button onClick={sendData}>Найти</button>
        </div>
      </Modals>
    </>
  );
};

export default SaleMenu;
/// delete