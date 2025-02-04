///// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//////fns
import {
  acceptMoney,
  editLeftoversPayRevision,
} from "../../../store/reducers/requestSlice";

//////componets
import ReactSelect from "react-select";
import MyModals from "../../../common/MyModals/MyModals";
import SendInput from "../../../common/SendInput/SendInput";

////// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

////// helpers
import { transformLists } from "../../../helpers/transformLists";
import { myAlert } from "../../../helpers/MyAlert";

////style
import "./style.scss";

const ModaRevisonlPay = ({ modalState, setModalState, getData }) => {
  //// модалка для оплаты ТТ
  const dispatch = useDispatch();

  const closeModal = () => setModalState({});

  const sendMoney = async (e) => {
    e.preventDefault();
    if (!!!modalState?.leftovers_pay) {
      return myAlert("Введи актуальную сумму", "error");
    }
    const send = {
      leftovers_pay: modalState?.leftovers_pay,
      invoice_guid: modalState?.invoice_guid,
    };
    const res = await dispatch(editLeftoversPayRevision(send)).unwrap();
    if (!!res) {
      myAlert("Данные обновлены");
      getData();
    }
  };

  return (
    <div className="leftoversRevision">
      <MyModals
        openModal={modalState?.invoice_guid}
        closeModal={closeModal}
        title={"Введите остаток денег"}
      >
        <form className="modalAddSpending" onSubmit={sendMoney}>
          <SendInput
            value={modalState?.leftovers_pay}
            onChange={(e) =>
              setModalState({ ...modalState, leftovers_pay: e.target.value })
            }
            title={"Сумма (сом)"}
            name={"amount"}
            type={"number"}
          />
          <button className="saveAction" type="submit">
            <LibraryAddIcon sx={{ width: 16, height: 16 }} />
            <p>Подтвердить</p>
          </button>
        </form>
      </MyModals>
    </div>
  );
};

export default ModaRevisonlPay;
