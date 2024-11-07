///// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

////// helpers

///// fns
import {
  addProdInInvoice,
  getProducts,
} from "../../../store/reducers/saleSlice";

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
  const { invoice_guid, refInputSum, type } = props;

  console.log(modal, "modal");

  const addProd = async (e) => {
    e.preventDefault();

    if (price == 0 || price == "") {
      alert("Введите сумму товара");
      return;
    }

    const sendDataSale = {
      invoice_guid,
      product_guid: modal?.guid,
      count: price,
      sale_price: 0,
      price: modal?.sale_price,
    };

    const sendDataSoputa = {
      guid: modal?.guid,
      count: price,
      price: modal?.sale_price,
      sale_price: modal?.sale_price,
      invoice_guid,
    };

    const objType = {
      1: sendDataSale,
      2: sendDataSoputa,
      3: {
        invoice_guid,
        products: [
          { count: price, guid: modal?.guid, price: modal?.sale_price },
        ],
      },
    };

    const send = { data: objType?.[type], type };
    const resp = await dispatch(addProdInInvoice(send)).unwrap();
    if (!!resp?.result) {
      dispatch(getProducts({ invoice_guid, type }));
      closeModal();
    }
  };

  const objTypeVes = {
    1: "Введите количество товара в 'шт'",
    2: "Введите вес товара в 'кг'",
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
      title={modal?.product_name || "..."}
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
        <div className="info">
          <p>Стоимость товара</p>
          <p>{modal?.sale_price} сом</p>
        </div>
        <div className="info">
          <p>Единица измерения</p>
          <p>"{modal?.unit}"</p>
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
