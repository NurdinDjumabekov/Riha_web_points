////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import { EveryMyInvoice } from "../../../components/MainInvoiceProd/EveryMyInvoice/EveryMyInvoice";

////// fns
import { getAcceptInvoice } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";
import NavMenu from "../../../common/NavMenu/NavMenu";

const AcceptInvoiceHistoryPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.saveDataSlice);

  const { listAcceptInvoice } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => dispatch(getAcceptInvoice(data?.seller_guid));

  const screns = [
    "/main_invoice/accept_detailed",
    "/main_invoice/every_accept_inv",
  ];

  return (
    <>
      <NavMenu navText={"Список принятых накладных"} />
      <div className="listInvoices">
        {listAcceptInvoice?.map((item) => (
          <EveryMyInvoice key={item.guid} obj={item} screns={screns} />
        ))}
      </div>
    </>
  );
};

export default AcceptInvoiceHistoryPage;
