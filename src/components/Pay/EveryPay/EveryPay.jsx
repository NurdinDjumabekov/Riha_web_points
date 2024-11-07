/////// helpers
import { typesPay } from "../../../helpers/Data";
import { formatCount } from "../../../helpers/amounts";

////// style
import "./style.scss";
//// delete

const EveryPay = ({ item }) => {
  return (
    <div className="everyProdPay">
      <div className="everyProdPay__inner">
        <div className="blockTitlePay">
          <div className="blockTitlePay__inner">
            <p>{item?.date_system}</p>
          </div>
          <span>{typesPay?.[item?.transaction_type]}</span>
          <b>{item.comment || "..."}</b>
        </div>
        <div className="status">
          <p>Успешно</p>
          <span>{formatCount(item?.total)} сом</span>
        </div>
      </div>
    </div>
  );
};

export default EveryPay;
