/////hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/////components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import { RenderResult } from "../../../common/RenderResult/RenderResult";

/////fns
import { getMyEveryInvoiceReturn } from "../../../store/reducers/requestSlice";
import { acceptInvoiceReturn } from "../../../store/reducers/requestSlice";

/////style
import "./style.scss";

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

  const keyName = {
    count: "count",
    price: "price",
    total_price: "total_workshop",
    total_price_invoice: "total_price",
  };

  return (
    <div className="detailedMain">
      {checkStatus && (
        <div className="rightPosition">
          <button className="saveAction" onClick={clickOkay}>
            Принять
          </button>
          <button className="saveAction rejectBtn" onClick={clickNo}>
            Отклонить
          </button>
        </div>
      )}

      <div className="detailedMain__inner">
        <RenderResult
          list={everyInvoiceReturn?.list}
          title={`Накладная № ${everyInvoiceReturn?.codeid}, дата создания: ${everyInvoiceReturn?.date} `}
          keyName={keyName}
        />
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
  );
};

export default DetailedReturnPage;
