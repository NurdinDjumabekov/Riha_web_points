////// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

///// fns
import { createInvoiceCheck } from "../../../store/reducers/requestSlice";

///// components
import Select from "react-select";
import MyModals from "../../../common/MyModals/MyModals";
import SendInput from "../../../common/SendInput/SendInput";

///// style
import "./style.scss";

//// helpers
import { transformLists } from "../../../helpers/transformLists";

///// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const ModalWorkShop = ({ openModal, setOpenModal }) => {
  //// модалка для выбора цеха и продавца для которого ревизия

  const [sellerTo, setSellerTo] = useState({});
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { listSellersPoints } = useSelector((state) => state.requestSlice);

  const listAgentsNew = transformLists(listSellersPoints, "guid", "fio");

  const { data } = useSelector((state) => state.saveDataSlice);

  const choiceSeller = (obj) => setSellerTo(obj);

  const createInvocieRevision = async (e) => {
    e.preventDefault();
    if (!!!sellerTo?.value) {
      return alert("Выберите продаввца для ревизии");
    }
    if (!!!comment) {
      return alert("Добавьте комментарий");
    }

    const send = {
      seller_guid_to: sellerTo?.value,
      seller_guid_from: data?.seller_guid,
      comment,
    };
    const res = await dispatch(createInvoiceCheck(send)).unwrap();
    if (!!res?.invoice_guid) {
      navigate(`/sale_qr_code/main`, {
        state: { invoice_guid: res?.invoice_guid, type: 3 },
      });
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setSellerTo({});
  };

  return (
    <MyModals
      openModal={openModal}
      closeModal={closeModal}
      title={"Создание накладной для ревизии"}
    >
      <form
        className="actionsAddProd revisionModal"
        onSubmit={createInvocieRevision}
      >
        <div className="inputSend">
          <div className="myInputs">
            <h6>Выберите продавца для ревизии</h6>
            <Select
              options={listAgentsNew}
              className="select"
              onChange={choiceSeller}
              value={sellerTo}
            />
          </div>
        </div>
        <SendInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          title={"Комментарий"}
          name={"comment"}
          typeInput={"textarea"}
        />
        <button className="saveAction" type="submit">
          <LibraryAddIcon sx={{ width: 16, height: 16 }} />
          <p>Создать накладную для сопутки</p>
        </button>
      </form>
    </MyModals>
  );
};

export default ModalWorkShop;
