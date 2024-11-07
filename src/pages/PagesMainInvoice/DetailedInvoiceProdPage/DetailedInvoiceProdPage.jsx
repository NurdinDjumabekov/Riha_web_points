///hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

///components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import NavMenu from "../../../common/NavMenu/NavMenu";
import { RenderResult } from "../../../common/RenderResult/RenderResult";

///states
import { getMyEveryInvoice } from "../../../store/reducers/requestSlice";
import { acceptInvoiceTT } from "../../../store/reducers/requestSlice";

////helpers

////style
import "./style.scss";

const DetailedInvoiceProdPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { guid } = location.state;

  const [acceptOk, setAcceptOk] = useState(false); //// для модалки приняти накладной
  const [rejectNo, setRejectNo] = useState(false); //// для модалки отказа накладной

  const { everyInvoice } = useSelector((state) => state.requestSlice);
  const { acceptConfirmInvoice } = useSelector((state) => state.stateSlice);

  const { data } = useSelector((state) => state.saveDataSlice);

  const clickOkay = () => setAcceptOk(true);

  const clickNo = () => setRejectNo(true);

  const acceptInvoiceFN = () => {
    ///// для принятия накладной торговой токой
    const send = { ...acceptConfirmInvoice, status: 2 };
    const obj = { seller_guid: data?.seller_guid };
    dispatch(acceptInvoiceTT({ props: { ...send, ...obj }, navigate }));
    setAcceptOk(false);
  };

  const rejectInvoiceFN = () => {
    ///// для отклонения накладной торговой токой
    const send = { ...acceptConfirmInvoice, status: -2 };
    const obj = { seller_guid: data?.seller_guid };
    dispatch(acceptInvoiceTT({ props: { ...send, ...obj }, navigate }));
    setRejectNo(false);
  };

  useEffect(() => {
    dispatch(getMyEveryInvoice(guid));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const checkStatus = everyInvoice?.status !== 0;

  return (
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
          list={everyInvoice?.list}
          title={`Дата создания: ${everyInvoice?.date}`}
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

export default DetailedInvoiceProdPage;
