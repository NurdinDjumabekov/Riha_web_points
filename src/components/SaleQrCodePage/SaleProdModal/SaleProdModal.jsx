///// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

////// helpers

///// fns
import { addProdInInvoice } from "../../../store/reducers/saleSlice";

////// components
import MyModals from "../../../common/MyModals/MyModals";

///// icons
import NoteAddIcon from "@mui/icons-material/NoteAdd";

////// styles
import "./style.scss";

const SaleProdModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { modal, closeModal, price, setPrice } = props;
  const { invoice_guid, getData, refInputSum } = props;

  const addProd = async (e) => {
    e.preventDefault();

    if (price == 0 || price == "") {
      alert("Введите сумму товара");
      return;
    }

    const sendData = {
      invoice_guid,
      product_guid: modal?.guid,
      count: +price,
      sale_price: 0,
      price: modal?.sale_price,
    };
    const resp = await dispatch(addProdInInvoice(sendData)).unwrap();
    if (!!resp?.result) {
      getData();
      closeModal();
    }
  };

  const objTypeVes = {
    1: "Введите количество товарва в 'шт'",
    2: "Введите вес товарва в 'кг'",
  };

  const onChangeCount = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <MyModals
      openModal={!!modal?.guid}
      closeModal={closeModal}
      title={modal?.product_name}
    >
      <form onSubmit={addProd} className="actionsAddProd">
        <div className="inputSend">
          <p>{objTypeVes?.[modal?.unit_codeid]}</p>
          <input
            ref={refInputSum}
            type="text"
            onChange={onChangeCount}
            value={price}
          />
        </div>
        <button className="saveAction" type="submit">
          <NoteAddIcon sx={{ width: 16, height: 16 }} />
          <p>Добавить товар</p>
        </button>
      </form>
    </MyModals>
  );
};

export default SaleProdModal;
