/////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import EveryMyInvoice from "../../../components/MainInvoiceProd/EveryMyInvoice/EveryMyInvoice";

/////// fns
import { getAcceptInvoiceReturn } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";

const AcceptReturnHistoryPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.saveDataSlice);

  const { listAcceptInvoiceReturn } = useSelector(
    (state) => state.requestSlice
  );

  const getData = () => dispatch(getAcceptInvoiceReturn(data?.seller_guid));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getData();
  }, []);

  const screns = ["/return/detailed", "/return/every"];

  return (
    <>
      <NavMenu navText={"Список накладных возврат"} />
      <div className="blockListHistory">
        {listAcceptInvoiceReturn?.map((item) => (
          <EveryMyInvoice obj={item} screns={screns} key={item?.guid} />
        ))}
      </div>
    </>
  );
};

export default AcceptReturnHistoryPage;
