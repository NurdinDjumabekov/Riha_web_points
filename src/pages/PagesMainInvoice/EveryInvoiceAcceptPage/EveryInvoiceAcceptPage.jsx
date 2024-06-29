////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

////// components
import { RenderResult } from "../../../common/RenderResult/RenderResult";
import { getAcceptProdInvoice } from "../../../store/reducers/requestSlice";
import ResultCounts from "../../../common/ResultCounts/ResultCounts";

////// helpers
import { formatCount } from "../../../helpers/amounts";

////style
import "./style.scss";
import NavMenu from "../../../common/NavMenu/NavMenu";

const EveryInvoiceAcceptPage = () => {
  //// каждый возврат накладной типо истории
  const dispatch = useDispatch();
  const location = useLocation();

  const { codeid, guid } = location.state; /// guid - накладной

  const { listAcceptInvoiceProd } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    dispatch(getAcceptProdInvoice(guid));
  }, []);

  const newList = listAcceptInvoiceProd?.[0]?.list;

  if (newList?.length === 0) {
    return <p className="noneData">Данные отсутствуют</p>;
  }

  return (
    <>
      <NavMenu navText={`Накладная №${codeid}`} />
      <div className="parentAcceptEvery">
        <div>
          {newList?.map((item, index) => (
            <RenderResult key={item.guid} item={item} index={index} />
          ))}
        </div>

        <div className="results">
          <ResultCounts list={newList} />
          <p className="totalItemCount">
            Сумма: {formatCount(listAcceptInvoiceProd?.[0]?.total_price)} сом
          </p>
        </div>
      </div>
    </>
  );
};

export default EveryInvoiceAcceptPage;
