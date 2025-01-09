///// hooks
import { useLocation, useNavigate } from "react-router-dom";

////// styles
import "./style.scss";

////// components
import ScanQRCode from "../../../common/ScanQRCode/ScanQRCode";

const SaleProdPage = () => {
  const location = useLocation();

  const { invoice_guid, codeid, type } = location.state;

  // const typeTitle = { 1: "Продажи", 2: "Сопутка", 3: "Ревизия" };

  return (
    <div className="saleProdPage">
      <ScanQRCode
        title={"Продажи"}
        invoice_guid={invoice_guid}
        codeid={codeid}
        type={type}
      />
    </div>
  );
};

export default SaleProdPage;
