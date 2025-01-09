////hooks
import { useState } from "react";
import ReactSelect from "react-select";
import { useDispatch, useSelector } from "react-redux";

////style
import "./style.scss";

///// fns
import { addExpenseTT } from "../../../store/reducers/requestSlice";

//// components
import MyModals from "../../../common/MyModals/MyModals";
import SendInput from "../../../common/SendInput/SendInput";

///// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { myAlert } from "../../../helpers/MyAlert";

const ModalAddSpending = ({ setModal, modal, getData }) => {
  const dispatch = useDispatch();

  const { listCategExpense } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const [expense, setExpense] = useState({
    expense_type: {},
    comment: "",
    amount: "",
  });

  const changeSel = (expense_type) => {
    const send = { ...expense, expense_type };
    setExpense(send);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const send = { ...expense, [name]: value };
    setExpense(send);
  };

  const closeModal = () => {
    setModal(false);
    setExpense({ expense_type: {}, comment: "", amount: "" });
  };

  const addExpense = async (e) => {
    e.preventDefault();

    if (!!!expense?.amount) {
      return myAlert("Заполните сумму", "error");
    }

    if (expense?.comment == "") {
      return myAlert("Заполните комментарий", "error");
    }

    if (!!!expense?.expense_type?.value) {
      return myAlert("Выберите категорию!", "error");
    } else {
      const dataSend = {
        ...expense,
        expense_type: expense?.expense_type?.value,
        seller_guid: data?.seller_guid,
      };
      const res = await dispatch(addExpenseTT(dataSend)).unwrap();
      if (!!res?.result) {
        getData();
        closeModal();
      }
    }
  };

  return (
    <MyModals
      openModal={modal}
      closeModal={closeModal}
      title={"Введите расходы"}
    >
      <form className="modalAddSpending" onSubmit={addExpense}>
        <div className="myInputs">
          <h6>Выберите трату</h6>
          <ReactSelect
            options={listCategExpense}
            onChange={changeSel}
            value={expense?.expense_type}
          />
        </div>
        <SendInput
          value={expense?.amount}
          onChange={onChange}
          title={"Сумма (сом)"}
          name={"amount"}
          type={"number"}
        />
        <SendInput
          value={expense?.comment}
          onChange={onChange}
          title={"Комментарий"}
          name={"comment"}
          typeInput={"textarea"}
        />
        <button className="saveAction" type="submit">
          <LibraryAddIcon sx={{ width: 16, height: 16 }} />
          <p>Добавить трату</p>
        </button>
      </form>
    </MyModals>
  );
};

export default ModalAddSpending;
