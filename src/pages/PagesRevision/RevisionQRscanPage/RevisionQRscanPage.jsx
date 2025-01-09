///// hooks
import { useLocation, useNavigate } from "react-router-dom";

////// styles
import "./style.scss";

////// components
import ScanQRCode from "../../../common/ScanQRCode/ScanQRCode";

const RevisionQRscanPage = () => {
  const location = useLocation();

  const { invoice_guid, codeid, type } = location.state;

  return (
    <div className="saleProdPage">
      <ScanQRCode
        title={"Ревизия"}
        invoice_guid={invoice_guid}
        codeid={codeid}
        type={type}
      />
    </div>
  );
};

export default RevisionQRscanPage;
