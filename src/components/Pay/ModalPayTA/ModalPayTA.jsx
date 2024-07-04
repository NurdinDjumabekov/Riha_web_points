///// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//////fns
import { acceptMoney } from "../../../store/reducers/requestSlice";

//////componets
import Modals from "../../../common/Modals/Modals";
import ChoiceAgents from "../../../common/ChoiceAgents/ChoiceAgents";

////style
import "./style.scss";

const ModalPayTA = ({ modalState, setModalState, getData }) => {
  //// модалка для оплаты ТТ
  const dispatch = useDispatch();

  const [obj, setObj] = useState({ comment: "", amount: "", agent_guid: "" });

  const { data } = useSelector((state) => state.saveDataSlice);
  const { listAgents } = useSelector((state) => state.requestSlice);

  const closeModal = () => {
    setModalState(false);
    setObj({ comment: "", amount: "", agent_guid: "" });
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

  const sendMoney = () => {
    ///// отплачиваю деньги как ТТ ревизору
    if (!obj?.amount) {
      alert("Введите сумму");
    } else if (!obj?.agent_guid) {
      alert("Выберите агента");
    } else {
      const dataObj = { ...obj, seller_guid: data?.seller_guid };
      dispatch(acceptMoney({ dataObj, closeModal, getData }));
      // if (temporaryGuidPoint?.debit < temporaryGuidPoint?.amount) {
      //   Alert.alert("Введенная вами сумма больше зарабатка торговой точки!");
      // } else {
      // }
    }
  };

  return (
    <Modals openModal={modalState} setOpenModal={() => setModalState(false)}>
      <div className="modalInnerPay" onClick={() => setModalState(true)}>
        <h6>Выберите агента</h6>
        <div className="choiceSelectBlock">
          {listAgents?.map((item) => (
            <ChoiceAgents
              item={item}
              setState={setObj}
              prev={obj}
              keyGuid={"agent_guid"}
              keyText={"agent"}
            />
          ))}
        </div>
        <div className="inputsPay">
          <input
            value={obj?.amount}
            onChange={onChange}
            name="amount"
            placeholder="Сумма"
            maxLength={8}
          />
          <textarea
            value={obj?.comment}
            onChange={onChange}
            placeholder="Ваш комментарий"
            name="comment"
            rows="4"
          />
          <button onClick={sendMoney}>Оплатить</button>
        </div>
      </div>
    </Modals>
  );
};

export default ModalPayTA;
