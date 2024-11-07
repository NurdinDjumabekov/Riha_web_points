///// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// styles
import "./style.scss";

////// components
import SaleProds from "../SaleProds/SaleProds";
import SearchProdPage from "../SearchProdPage/SearchProdPage";

const SaleProdPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { invoice_guid, codeid, type } = location.state;
  /// type - 3 - revision
  /// type - 2 - soputka
  /// type - 1 - sale

  const typeTitle = {
    1: "Продажи",
    2: "Сопутка",
    3: "Ревизия",
  };

  return (
    <div className="saleProdPage">
      <h3>{typeTitle?.[type]}</h3>
      <SearchProdPage invoice_guid={invoice_guid} type={type} />
      <SaleProds
        invoice_guid={invoice_guid}
        status={0}
        codeid={codeid}
        type={type}
      />
    </div>
  );
};

export default SaleProdPage;
