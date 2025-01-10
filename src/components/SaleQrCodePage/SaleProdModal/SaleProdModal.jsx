///// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

///// fns
import {
  addProdInInvoice,
  getProducts,
} from "../../../store/reducers/saleSlice";

////// components
import MyModals from "../../../common/MyModals/MyModals";

///// icons
import NoteAddIcon from "@mui/icons-material/NoteAdd";

///// helpers
import { myAlert } from "../../../helpers/MyAlert";

////// styles
import "./style.scss";

const SaleProdModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { modal, closeModal, price, setPrice } = props;
  const { invoice_guid, refInputSum, type } = props;

  const [lastInputTime, setLastInputTime] = useState(Date.now());
  const SCANNER_THRESHOLD = 50; /// временя для сканера в миллисекундах

  const addProdFN = async (e) => {
    e.preventDefault();

    if (price == 0 || price == "") {
      return myAlert("Введите вес товара", "error");
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
    const now = Date.now();
    const timeDifference = now - lastInputTime;

    const check =
      /^\d*\.?\d*$/.test(e.target.value) && timeDifference > SCANNER_THRESHOLD;

    if (check) {
      setPrice(e.target.value);
      setLastInputTime(now);
    }
  };

  const handleKeyPress = (e) => {
    const now = Date.now();
    const timeDifference = now - lastInputTime;

    if (e.code === "Enter") {
      if (timeDifference < SCANNER_THRESHOLD) {
        e.preventDefault();
        setPrice("");
      }
    }
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
            onChange={onChangeCount}
            onKeyPress={handleKeyPress}
            value={price}
            autoComplete="off"
          />
        </div>
        <div className="info">
          <p>Стоимость товара</p>
          <p>{modal?.sale_price} сом</p>
        </div>
        <div className="info">
          <p>Единица измерения</p>
          {modal?.unit && <p>"{modal?.unit}"</p>}
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
