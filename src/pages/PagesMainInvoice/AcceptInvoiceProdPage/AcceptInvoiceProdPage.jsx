////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// components
// import { EveryMyInvoice } from "../../../components/MainInvoiceProd/EveryMyInvoice/EveryMyInvoice";

////// fns
import { getMyInvoice } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";
import { EveryMyInvoice } from "../../../components/MainInvoiceProd/EveryMyInvoice/EveryMyInvoice";
import NavMenu from "../../../common/NavMenu/NavMenu";

const AcceptInvoiceProdPage = () => {
  ////// загрузки
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listMyInvoice } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const getData = () => dispatch(getMyInvoice(data?.seller_guid));

  useEffect(() => {
    getData();
  }, []);

  const getHistory = () => navigate("/main_invoice/accept_history");

  const screns = [
    "/main_invoice/accept_detailed",
    "/main_invoice/every_accept_inv",
  ];

  return (
    <>
      <NavMenu navText={"Список накладных"} />
      <div>
        <button onClick={getHistory} className="actionAccept">
          <p>Список принятых накладных</p>
          <div className="arrow"></div>
        </button>
        <div className="listInvoices">
          {listMyInvoice?.map((item) => (
            <EveryMyInvoice key={item.guid} obj={item} screns={screns} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AcceptInvoiceProdPage;
