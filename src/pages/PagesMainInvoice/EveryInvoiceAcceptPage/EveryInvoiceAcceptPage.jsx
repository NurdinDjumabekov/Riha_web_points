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

const EveryInvoiceAcceptPage = () => {
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
    if (!!res?.result) {
      navigate("/");
    }
  };

  const checkUser =
    data?.seller_guid == listAcceptInvoiceProd?.[0]?.seller_to_guid;

  const objAction = {
    3: (
      <div className="header">
        {checkUser && (
          <button className="saveAction " onClick={() => setConfirm(true)}>
            <LibraryAddIcon sx={{ width: 16, height: 16 }} />
            <p>Принять ревизию</p>
          </button>
        )}
      </div>
    ),
  };

  return (
    <div className="parentAcceptEvery">
      {objAction?.[type]}

      <RenderResult
        list={newList?.slice(1, 100)}
        title={`Накладная № ${newList?.[0]?.codeid}`}
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

export default EveryInvoiceAcceptPage;
