///hooks
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

////style
import "./style.scss";

////components
import { getEveryProd } from "../../../store/reducers/requestSlice.js";
import { addProductInvoiceTT } from "../../../store/reducers/requestSlice.js";

const EverySaleProdScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const refInput = useRef(null);

  const { obj } = location.state;

  const { infoKassa } = useSelector((state) => state.requestSlice);

  const { data } = useSelector((state) => state.saveDataSlice);

  const { everyProdSale } = useSelector((state) => state.requestSlice);

  const [sum, setSum] = useState("");

  const onChange = (p) => {
    if (/^\d*\.?\d*$/.test(p)) {
      // Проверяем, не является ли точка первым символом
      if (p === "." || p?.indexOf(".") === 0) {
        return;
      }
      setSum(p);
    }
  };

  useEffect(() => {
    if (!!obj?.guid) {
      setTimeout(() => {
        refInput?.current?.focus();
      }, 400);
    }
    dispatch(getEveryProd({ guid: obj?.guid, seller_guid: data?.seller_guid }));
    /////// получаю каждый прожуке для продажи
  }, []);

  const confp = `Недостаточное количество товара, у вас остаток ${everyProdSale?.end_outcome} ${everyProdSale?.unit}`;

  const typeProd = `Введите ${
    everyProdSale?.unit_codeid == 1 ? "количество" : "вес"
  }`;

  const addInInvoice = () => {
    if (sum == "" || sum == 0) {
      alert(typeProd);
    } else {
      const { price, sale_price, count_type } = everyProdSale;
      const sendData = { guid: obj?.guid, count: sum, sale_price };
      const data = { invoice_guid: infoKassa?.guid, price, ...sendData };
      dispatch(addProductInvoiceTT({ data, navigate, count_type }));
      ///// продаю товар
    }
  };

  const onClose = () => navigate(-1);

  const typeVes = {
    1: `Введите ${
      everyProdSale?.unit_codeid == 1 ? "итоговое количество" : "итоговый вес"
    } товара`,
    2: "Введите итоговую сумму товара",
  };

  return (
    <div className="parentEveryProdSale">
      <p className="title">{everyProdSale?.product_name}</p>
      <button className="krest" onPress={onClose}>
        <div className="line deg" />
        <div className="line degMinus" />
      </button>
      <p className="leftovers">
        Остаток: {everyProdSale?.end_outcome} {everyProdSale?.unit}
      </p>
      <div className="addDataBlock">
        <div className="inputBlock">
          <p className="inputTitle">
            Цена продажи {everyProdSale?.unit && `за ${everyProdSale?.unit}`}
          </p>
          <input
            className="input"
            value={`${everyProdSale?.sale_price?.toString()} сом`}
            maxLength={8}
            readOnly
          />
        </div>
        <div className="inputBlock">
          <p className="inputTitle">{typeVes?.[+everyProdSale?.count_type]}</p>
          <input
            className="input"
            ref={refInput}
            value={sum}
            onChange={onChange}
            maxLength={8}
          />
        </div>
      </div>
      <button className="btnAdd" onclick={addInInvoice}>
        Продать товар
      </button>
    </div>
  );
};

export default EverySaleProdScreen;
