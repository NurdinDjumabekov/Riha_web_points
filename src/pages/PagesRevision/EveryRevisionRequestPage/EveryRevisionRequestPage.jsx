////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

///components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import NavMenu from "../../../common/NavMenu/NavMenu";
import MyTable from "../../../components/Tables/MyTable/MyTable";
import ResultCounts from "../../../common/ResultCounts/ResultCounts";

//// fns
import { acceptInvoiceRevision } from "../../../store/reducers/requestSlice";
import { getEveryRevisionRequest } from "../../../store/reducers/requestSlice";

////helpers
import { formatCount } from "../../../helpers/amounts";

////style
import "./style.scss";

const EveryRevisionRequestPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { invoice_guid, disable } = location.state;

  const [modalVisibleOk, setModalVisibleOk] = useState(false);

  const { everyRequestRevision } = useSelector((state) => state.requestSlice);

  const clickOkay = () => setModalVisibleOk(true);

  const sendData = () => {
    dispatch(acceptInvoiceRevision({ invoice_guid, navigate }));
    setModalVisibleOk(false);
  };

  useEffect(() => {
    dispatch(getEveryRevisionRequest(invoice_guid));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [everyRequestRevision?.codeid]);

  return (
    <>
      <NavMenu navText={`Накладная №${everyRequestRevision?.codeid}`} />
      <div className="everyRevision">
        <div className="everyRevision__inner">
          <h6>Дата создания: {everyRequestRevision?.date}</h6>
          <MyTable arr={everyRequestRevision?.list} />
          <div className="actionBlockEvery">
            <ResultCounts list={everyRequestRevision?.list} />
            <p>Сумма: {formatCount(everyRequestRevision?.total_price)} сом</p>
            {!disable && <button onClick={clickOkay}>Принять накладную</button>}
          </div>
        </div>

        <ConfirmationModal
          visible={modalVisibleOk}
          message="Принять накладную ревизии ?"
          onYes={sendData}
          onNo={() => setModalVisibleOk(false)}
          onClose={() => setModalVisibleOk(false)}
        />
      </div>
    </>
  );
};

export default EveryRevisionRequestPage;
