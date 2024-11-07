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
import { RenderResult } from "../../../common/RenderResult/RenderResult";

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
      <div className="detailedMain">
        {checkStatus && (
          <div className="actionBlockHeader">
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
            title={`Дата создания: ${everyInvoiceReturn?.date}`}
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
    </>
  );
};

export default DetailedReturnPage;
