////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import EveryMyInvoice from "../../../components/MainInvoiceProd/EveryMyInvoice/EveryMyInvoice";

////// fns
import { getMyReturnInvoice } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";

const MyReturnsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listMyInvoiceReturn } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const getData = () => {
    dispatch(getMyReturnInvoice(data?.seller_guid));
  };

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getHistory = () => navigate("/return/accept");

  const screns = ["/return/detailed", "/return/every"];

  return (
    <>
      <NavMenu navText={"Возврат товара"} />
      <div className="returnMainBlock">
        <div onClick={getHistory} className="returnMainBlock__title">
          <p>Список накладных для воврата</p>
          <div></div>
        </div>
        <div className="listBlock">
          {[
            ...listMyInvoiceReturn,
            ...listMyInvoiceReturn,
            ...listMyInvoiceReturn,
            ...listMyInvoiceReturn,
            ...listMyInvoiceReturn,
          ]?.map((item) => (
            <EveryMyInvoice obj={item} screns={screns} key={item?.guid} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyReturnsPage;
