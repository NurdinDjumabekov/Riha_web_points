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

  return (
    <div className="parentAcceptEvery">
      <RenderResult
        list={newList}
        title={`Накладная № ${newList?.[0]?.codeid}`}
      />
    </div>
  );
};

export default EveryReturnPage;
