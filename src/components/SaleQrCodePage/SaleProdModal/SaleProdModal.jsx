///// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

///// fns
import {
  addProdInInvoice,
  getProducts,
} from "../../../store/reducers/saleSlice";

////// components
import MyModals from "../../../common/MyModals/MyModals";
import Switch from "@mui/material/Switch";

///// icons
import NoteAddIcon from "@mui/icons-material/NoteAdd";

////// styles
import "./style.scss";

///// helpers
import { myAlert } from "../../../helpers/MyAlert";

const SaleProdModal = (props) => {
  const { modal, setModal, closeModal } = props;
  const { invoice_guid, refInputSum, type } = props;

  const dispatch = useDispatch();

  const [lastInputTime, setLastInputTime] = useState(Date.now());

  const addProdFN = async (e) => {
    e.preventDefault();

    if (modal?.count == "" || modal?.count == 0) {
      return myAlert("Введите вес товара", "error");
    }

    if (modal?.sale_price == "" || modal?.sale_price == 0) {
      return myAlert("Введите стоимость товара", "error");
    }

    const sendDataSale = {
      invoice_guid,
      product_guid: modal?.guid,
      count: modal?.count,
      sale_price: 0,
      price: modal?.sale_price,
      unit_codeid: modal?.unit_codeid,
      none_prod: modal?.none_prod,
    };

    const sendDataSoputa = {
      guid: modal?.guid,
      count: modal?.count,
      price: modal?.sale_price,
      sale_price: modal?.sale_price,
      invoice_guid,
    };

    const sendSoputka = {
      invoice_guid,
      products: [
        { count: modal?.count, guid: modal?.guid, price: modal?.sale_price },
      ],
    };

    const objType = { 1: sendDataSale, 2: sendDataSoputa, 3: sendSoputka };

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

  const onChange = (e) => {
    const now = Date.now();
    const timeDifference = now - lastInputTime;

    const check = /^\d*\.?\d*$/.test(e.target.value) && timeDifference > 50;

    if (check) {
      setModal({ ...modal, [e.target?.name]: e.target?.value });
      setLastInputTime(now);
    }
  };

  const handleKeyPress = (e) => {
    const now = Date.now();
    const timeDifference = now - lastInputTime;

    if (e.code === "Enter") {
      if (timeDifference < 50) {
        e.preventDefault();
        if (e?.target?.name == "count") {
          setModal({ ...modal, count: "" });
        } else if (e?.target?.name == "sale_price") {
          setModal({ ...modal, sale_price: "" });
        }
      }
    }
  };

  const onChangeRadio = (e) => {
    setModal({ ...modal, unit_codeid: !!e?.target?.checked ? 1 : 2 });
  };

  return (
    <MyModals
      openModal={!!modal?.guid}
      closeModal={closeModal}
      title={modal?.product_name || "..."}
    >
      <form onSubmit={addProdFN} className="actionsAddProd">
        <div className="inputSend">
          <p>{objTypeVes?.[modal?.unit_codeid]}</p>
          <input
            ref={refInputSum}
            type="text"
            onChange={onChange}
            onKeyPress={handleKeyPress}
            value={modal?.count}
            autoComplete="off"
            name="count"
            required
          />
        </div>

        <div className="inputSend">
          <p>Стоимость товара</p>
          <input
            type="text"
            onChange={onChange}
            onKeyPress={handleKeyPress}
            value={modal?.sale_price}
            autoComplete="off"
            name="sale_price"
            required
          />
        </div>

        <div className="info labelRadio">
          <p>Единица измерения</p>
          <div>
            {modal?.unit_codeid && (
              <p>"{modal?.unit_codeid == 1 ? "шт" : "кг"}"</p>
            )}
            <div className="labelRadio__main">
              <Switch
                onChange={onChangeRadio}
                value={modal?.unit_codeid == 1 ? true : false}
                defaultChecked={modal?.unit_codeid == 1 ? true : false}
              />
            </div>
          </div>
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
