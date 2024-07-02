/////// helpers
import { useNavigate } from "react-router-dom";
import { statusColor, statusRevision } from "../../../helpers/Data";

/////// style
import "./style.scss";

const ListProdsRevision = ({ item, disable }) => {
  const navigate = useNavigate();

  const lookInvoice = (invoice_guid) => {
    navigate("/revision/every", { state: { invoice_guid, disable } });
  };

  return (
    <button
      className="containerListRevision"
      onClick={() => lookInvoice(item?.guid)}
    >
      <div className="innerBlock">
        <h6 className="titleDate">{item?.date}</h6>
        <div className="mainData">
          <p className="indexNums">{item?.codeid}</p>
          <div>
            <p className="titleDate roleRevision">{item?.seller_from}</p>
            <p
              className="titleDate"
              style={{ color: statusColor?.[item?.status] }}
            >
              {statusRevision?.[item.status]}
            </p>
          </div>
        </div>
      </div>
      <div className="arrow"></div>
    </button>
  );
};

export default ListProdsRevision;
