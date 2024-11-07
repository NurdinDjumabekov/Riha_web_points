///// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//////fns
import { acceptMoney } from "../../../store/reducers/requestSlice";

//////componets
import ReactSelect from "react-select";
import MyModals from "../../../common/MyModals/MyModals";
import SendInput from "../../../common/SendInput/SendInput";

////// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

////// helpers
import { transformLists } from "../../../helpers/transformLists";

////style
import "./style.scss";

const ModalPay = ({ modalState, setModalState, getData }) => {
  //// модалка для оплаты ТТ
  const dispatch = useDispatch();

  const [obj, setObj] = useState({ comment: "", amount: "", agent_guid: {} });

  const { data } = useSelector((state) => state.saveDataSlice);
  const { listAgents } = useSelector((state) => state.requestSlice);

  const listAgentsNew = transformLists(listAgents, "agent_guid", "agent");

  const closeModal = () => {
    setModalState(false);
    setObj({ comment: "", amount: "", agent_guid: {} });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      if (/^-?\d*\.?\d*$/.test(value)) {
        setObj({ ...obj, amount: value });
      }
    } else {
      setObj({ ...obj, comment: value });
    }
  };

  const sendMoney = async (e) => {
    e.preventDefault();

    ///// отплачиваю деньги как ТТ ревизору
    if (!!!obj?.amount) {
      alert("Введите сумму");
    } else if (!!!obj?.agent_guid) {
      alert("Выберите агента");
    } else {
      const dataObj = {
        ...obj,
        seller_guid: data?.seller_guid,
        agent_guid: obj?.agent_guid?.value,
      };
      dispatch(acceptMoney({ dataObj, closeModal, getData }));
    }
  };

  const changeSel = (agent_guid) => {
    const send = { ...obj, agent_guid };
    setObj(send);
  };

  return (
    <MyModals
      openModal={modalState}
      closeModal={closeModal}
      title={"Введите расходы"}
    >
      <form className="modalAddSpending" onSubmit={sendMoney}>
        <div className="myInputs">
          <h6>Выберите агента</h6>
          <ReactSelect
            options={listAgentsNew}
            onChange={changeSel}
            value={obj?.agent_guid}
          />
        </div>
        <SendInput
          value={obj?.amount}
          onChange={onChange}
          title={"Сумма (сом)"}
          name={"amount"}
          type={"number"}
        />
        <SendInput
          value={obj?.comment}
          onChange={onChange}
          title={"Комментарий"}
          name={"comment"}
          typeInput={"textarea"}
        />
        <button className="saveAction" type="submit">
          <LibraryAddIcon sx={{ width: 16, height: 16 }} />
          <p>Оплатить</p>
        </button>
      </form>
    </MyModals>
  );
};

export default ModalPay;
