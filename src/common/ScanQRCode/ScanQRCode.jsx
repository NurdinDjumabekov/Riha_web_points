///// hooks
import { useLocation, useNavigate } from "react-router-dom";

////// styles
import "./style.scss";

////// components
import SaleProds from "../../components/SaleQrCodePage/SaleProds/SaleProds";
import SearchProdPage from "../../components/SaleQrCodePage/SearchProdPage/SearchProdPage";
import NavPrev from "../NavPrev/NavPrev";

const ScanQRCode = (props) => {
  const { title, invoice_guid, codeid, type } = props;

  return (
    <>
      <div className="titleInAllPage bottomNav">
        <NavPrev />
        <h3>{title}</h3>
      </div>
      {/* {type != 1 && <SearchProdPage invoice_guid={invoice_guid} type={type} />} */}
      <SaleProds
        invoice_guid={invoice_guid}
        status={0}
        codeid={codeid}
        type={type}
      />
    </>
  );
};

export default ScanQRCode;
