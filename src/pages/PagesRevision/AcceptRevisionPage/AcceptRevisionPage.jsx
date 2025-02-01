////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

////// components
import { RenderResult } from "../../../common/RenderResult/RenderResult";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

////style
import "./style.scss";

///// fns
import { getAcceptProdInvoice } from "../../../store/reducers/requestSlice";
import { updateStatusInvoice } from "../../../store/reducers/saleSlice";

///// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const AcceptRevisionPage = () => {
  //// каждый возврат накладной типо истории
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [confirm, setConfirm] = useState(false);

  const { guid, type } = location.state; /// guid - накладной

  const { listAcceptInvoiceProd } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    dispatch(getAcceptProdInvoice({ guid, type }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const newList = listAcceptInvoiceProd?.[0]?.list;

  const acceptInvoiceRevision = async () => {
    const send = { invoice_guid: guid, status: 2 };
    const res = await dispatch(updateStatusInvoice({ send, type })).unwrap();
    if (!!res?.result) navigate("/revision/request");
  };

  const checkUser =
    data?.seller_guid == listAcceptInvoiceProd?.[0]?.seller_from_guid;

  console.log(data, "asda");

  const keyName = {
    count: "count",
    price: "price",
    total_price: "total",
    total_price_invoice: "total_price",
  };

  return (
    <div className="parentAcceptEvery">
      {listAcceptInvoiceProd?.[0]?.status !== 2 && (
        <div className="header">
          {checkUser && (
            <button className="saveAction " onClick={() => setConfirm(true)}>
              <LibraryAddIcon sx={{ width: 16, height: 16 }} />
              <p>Принять ревизию</p>
            </button>
          )}
        </div>
      )}

      <RenderResult
        list={newList}
        title={`Накладная № ${listAcceptInvoiceProd?.[0]?.codeid}`}
        keyName={keyName}
      />

      <ConfirmationModal
        visible={!!confirm}
        message="Принять ревизию?"
        onYes={acceptInvoiceRevision}
        onNo={() => setConfirm("")}
        onClose={() => setConfirm("")}
      />
    </div>
  );
};

export default AcceptRevisionPage;
