/////// tags
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

/////// fns
import { clearListCategory } from "../../../store/reducers/requestSlice";
import { clearListProductTT } from "../../../store/reducers/requestSlice";
import { clearTemporaryData } from "../../../store/reducers/stateSlice";

/////// components
import EveryInvoiceSoputka from "../../../components/Soputka/EveryInvoiceSoputka/EveryInvoiceSoputka";

////style
import "./style.scss";

const AddProdSoputkaPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { forAddTovar } = location.state; //// хранятся данные накладной сапутки

  console.log(forAddTovar, "forAddTovar");

  useEffect(() => {
    defaultActive();

    return () => {
      dispatch(clearListCategory());
      dispatch(clearListProductTT());
      //// очищаю список категорий и товаров
    };
  }, []);

  const defaultActive = () => dispatch(clearTemporaryData()); // очищаю активный продукт

  const listProdSale = () => {
    const obj = { guidInvoice: forAddTovar?.invoice_guid };
    navigate("/soputka/prods", { state: obj });
  };

  return (
    <div className="parentBlockSale-soputka">
      <button onClick={listProdSale}>
        <p>Список сопутствующих товаров</p>
        <div className="arrow"></div>
      </button>
      <EveryInvoiceSoputka forAddTovar={forAddTovar} />
    </div>
  );
};

export default AddProdSoputkaPage;
