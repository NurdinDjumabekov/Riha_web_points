/////hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import ResultCounts from "../../../common/ResultCounts/ResultCounts";
import NavMenu from "../../../common/NavMenu/NavMenu";

/////fns
import { getMyEveryInvoiceReturn } from "../../../store/reducers/requestSlice";
import { acceptInvoiceReturn } from "../../../store/reducers/requestSlice";

/////helpers
import { formatCount } from "../../../helpers/amounts";

/////style
import "./style.scss";
import MyTable from "../../../components/Tables/MyTable/MyTable";
import { useLocation, useNavigate } from "react-router-dom";

const DetailedReturnPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { guid } = location.state;

  const [acceptOk, setAcceptOk] = useState(false); //// для модалки приняти накладной
  const [rejectNo, setRejectNo] = useState(false); //// для модалки отказа накладной

  const { everyInvoiceReturn } = useSelector((state) => state.requestSlice);
  const { acceptConfirmInvoice } = useSelector((state) => state.stateSlice);

  const { data } = useSelector((state) => state.saveDataSlice);

  const clickOkay = () => setAcceptOk(true);

  const clickNo = () => setRejectNo(true);

  const acceptInvoiceFN = () => {
    ///// для принятия накладной торговой токой
    const send = { ...acceptConfirmInvoice, status: 2 };
    const obj = { seller_guid: data?.seller_guid };
    dispatch(acceptInvoiceReturn({ props: { ...send, ...obj }, navigate }));
    setAcceptOk(false);
  };

  const rejectInvoiceFN = () => {
    ///// для отклонения накладной торговой токой
    const send = { ...acceptConfirmInvoice, status: -2 };
    const obj = { seller_guid: data?.seller_guid };
    dispatch(acceptInvoiceReturn({ props: { ...send, ...obj }, navigate }));
    setRejectNo(false);
  };

  useEffect(() => {
    dispatch(getMyEveryInvoiceReturn(guid));
  }, []);

  const checkStatus = everyInvoiceReturn?.status !== 0;

  return (
    <>
      <NavMenu navText={`Накладная №${everyInvoiceReturn?.codeid}`} />
      <div className="mainDetailedreturn">
        <div className="mainDetailedreturn__inner">
          <div className="dateReturn">
            <p>Дата создания: {everyInvoiceReturn?.date}</p>
          </div>
          <MyTable arr={everyInvoiceReturn?.list} />
          <div className="totalReturn">
            <ResultCounts list={everyInvoiceReturn?.list} />
            <p>Сумма: {formatCount(everyInvoiceReturn?.total_price)} сом</p>
            {checkStatus && (
              <div className="actionBlockReturn">
                <button onClick={clickOkay}>Принять накладную</button>
                <button onClick={clickNo}>Отклонить накладную</button>
              </div>
            )}
          </div>
        </div>

        <ConfirmationModal
          visible={acceptOk}
          message="Принять накладную ?"
          onYes={acceptInvoiceFN}
          onNo={() => setAcceptOk(false)}
          onClose={() => setAcceptOk(false)}
        />

        <ConfirmationModal
          visible={rejectNo}
          message="Отклонить накладную ?"
          onYes={rejectInvoiceFN}
          onNo={() => setRejectNo(false)}
          onClose={() => setRejectNo(false)}
        />
      </div>
    </>
  );
};

export default DetailedReturnPage;
