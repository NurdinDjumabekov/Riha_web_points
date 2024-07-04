////// hooks
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// fns
import { clearListCategory } from "../../../store/reducers/requestSlice";
import { clearListProductTT } from "../../../store/reducers/requestSlice";
import { createInvoiceTT } from "../../../store/reducers/requestSlice";
import { clearTemporaryData } from "../../../store/reducers/stateSlice";
import { changeActiveSelectCategory } from "../../../store/reducers/stateSlice";
import { changeActiveSelectWorkShop } from "../../../store/reducers/stateSlice";

/////// components
import { EveryInvoiceSale } from "../../../components/SaleProd/EveryInvoiceSale/EveryInvoiceSale";

////style
import "./style.scss";

const SalePointPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { infoKassa } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const getData = () => dispatch(createInvoiceTT(data?.seller_guid));

  useEffect(() => {
    clearStates();
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      dispatch(clearListProductTT());
      dispatch(clearListCategory());
      ///// очищаю список категрий и продуктов
      dispatch(changeActiveSelectCategory(""));
      /// очищаю категории, для сортировки товаров по категориям
      dispatch(changeActiveSelectWorkShop(""));
      /// очищаю цеха, для сортировки товаров по категориям
    };
  }, []);

  const clearStates = () => dispatch(clearTemporaryData()); // очищаю активный продукт

  const listProdSale = () => {
    navigate("/sale/sols_prods", { state: { guidInvoice: infoKassa?.guid } });
  };

  return (
    <div className="parentBlockSale-soputka">
      <button onClick={listProdSale}>
        <p>Список продаж</p>
        <div className="arrow"></div>
      </button>
      <EveryInvoiceSale />
    </div>
  );
};

export default SalePointPage;
