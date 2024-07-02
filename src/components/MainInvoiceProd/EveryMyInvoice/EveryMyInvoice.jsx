//// hooks
import { useDispatch } from "react-redux";
import { formatCount } from "../../../helpers/amounts";
import { useLocation, useNavigate } from "react-router-dom";

/////fns
import { clearAcceptInvoiceTT } from "../../../store/reducers/stateSlice";
import { changePreloader } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";

const EveryMyInvoice = (props) => {
  const { obj, screns } = props;

  //// для принятия накладных и возврата товара

  //// status - 0(накладные только для просмотра),
  //// 1(не принятые накладные),
  //// 2(принятые накладные)

  const location = useLocation(); ///// "/return/main" и "/main_invoice/accept_prod"
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /////////////////////////////////////////////////
  const check = location.pathname == "/return/main";
  /////////////////////////////////////////////////

  const objType = {
    0: { text: "На складе", color: "red" },
    1: { text: "Отгружено", color: "red" },
    2: { text: "Принято", color: "green" },
  };

  const objTypeReturn = {
    1: { text: "Ожидание", color: "red" },
    2: { text: "Принято", color: "green" },
  };

  const statusInfo = objType?.[obj?.status] || {
    text: "Отклонено",
    color: "red",
  };

  const statusReturns = objTypeReturn?.[obj?.status] || {
    text: "Отклонено",
    color: "red",
  };

  const checkStyle = check ? statusReturns : statusInfo;

  const lookInvoice = () => {
    const { date, guid, status, codeid } = obj;
    if (check) {
      if (status == 1) {
        /// if накладная отгружена для ТА
        const dataSend = { date, guid, status };
        navigate(screns?.[0], { state: dataSend });
        dispatch(clearAcceptInvoiceTT()); //// очиющаю guid накладной
        dispatch(changePreloader(true)); /// чтобы вначале не показывался пустой массив
      } else if (status == 2 || status == -2) {
        /// if накладная уже принята
        const dataSend = { codeid, guid };
        navigate(screns?.[1], { state: dataSend });
      }
    } else {
      if (status == 1 || status == 0) {
        /// if накладная отгружена для ТА
        const dataSend = { date, guid, status };
        navigate(screns?.[0], { state: dataSend });
        dispatch(clearAcceptInvoiceTT()); //// очиющаю guid накладной
        dispatch(changePreloader(true)); /// чтобы вначале не показывался пустой массив
      } else if (status == 2 || status == -2) {
        /// if накладная уже принята
        const dataSend = { codeid, guid };
        navigate(screns?.[1], { state: dataSend });
      }
    }
  };

  return (
    <button className="invoiceParent" onClick={lookInvoice}>
      <div className="invoiceParent__inner">
        <div className="mainData">
          <p className="indexNums">{obj?.codeid}</p>
          <div>
            <p className="titleDate role">{obj?.agent}</p>
            <p className="titleDate">{obj.date}</p>
          </div>
        </div>
        {!!obj?.comment ? (
          <p className="comments">{obj.comment}</p>
        ) : (
          <p className="comments"> ...</p>
        )}
      </div>
      <div className="mainDataArrow">
        <div>
          <p style={{ color: checkStyle?.color }}>{checkStyle?.text}</p>
          <span className="totalPrice">
            {formatCount(obj?.total_price)} сом
          </span>
        </div>
        <div className="arrow"></div>
      </div>
    </button>
  );
};

export default EveryMyInvoice;
