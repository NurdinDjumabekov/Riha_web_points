////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import { RenderResult } from "../../../common/RenderResult/RenderResult";
import { getAcceptProdInvoiceRetrn } from "../../../store/reducers/requestSlice";
import ResultCounts from "../../../common/ResultCounts/ResultCounts";
import NavMenu from "../../../common/NavMenu/NavMenu";

////// helpers
import { formatCount } from "../../../helpers/amounts";

////style
import "./style.scss";
import { useLocation } from "react-router-dom";

const EveryReturnPage = () => {
  //// каждый возврат накладной типо истории
  const dispatch = useDispatch();
  const location = useLocation();
  const { codeid, guid } = location.state; /// guid - накладной

  const { listAcceptReturnProd } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    dispatch(getAcceptProdInvoiceRetrn(guid));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const newList = listAcceptReturnProd?.[0]?.list;

  if (newList?.length === 0) {
    return <p className="noneData">Данные отсутствуют</p>;
  }

  return (
    <>
      <NavMenu navText={`Накладная №${codeid}`} />
      <div className="returnEvelyProdList">
        {newList?.map((item, index) => (
          <RenderResult item={item} index={index} key={item?.guid} />
        ))}
        <div className="returnEvelyProdList__results">
          <ResultCounts list={newList} />
          <p>
            Сумма: {formatCount(listAcceptReturnProd?.[0]?.total_price)} сом
          </p>
        </div>
      </div>
    </>
  );
};

export default EveryReturnPage;
