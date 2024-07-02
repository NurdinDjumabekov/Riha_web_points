////hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////fns
import { changeExpense } from "../../store/reducers/stateSlice";
import { addExpenseTT, getExpense } from "../../store/reducers/requestSlice";
import { getSelectExpense } from "../../store/reducers/requestSlice";

//////components
import { changeLocalData } from "../../store/reducers/saveDataSlice";
import NavMenu from "../../common/NavMenu/NavMenu";
import Selects from "../../common/Selects/Selects";

//////helpers
import { getLocalDataUser } from "../../helpers/returnDataUser";

////style
import "./style.scss";
import ListExpense from "../../components/Spendings/ListExpense/ListExpense";

const StoreSpendingPage = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.saveDataSlice);
  const { expense } = useSelector((state) => state.stateSlice);
  const { listCategExpense } = useSelector((state) => state.requestSlice);

  const getData = async () => {
    await getLocalDataUser({ changeLocalData, dispatch });
    await dispatch(getSelectExpense()); ///  список селекта расходов ТТ(их траты)
    await dispatch(getExpense(data?.seller_guid)); /// список расходов ТТ(их траты)
  };

  useEffect(() => {
    getData();
  }, []);

  const addExpense = () => {
    if (expense?.amount === "" || expense?.amount == "0") {
      alert("Заполните сумму");
    } else {
      if (expense?.expense_type == null || expense?.expense_type == "") {
        alert("Выберите категорию!");
      } else {
        const dataSend = { ...expense, seller_guid: data?.seller_guid };
        dispatch(addExpenseTT({ dataSend, getData }));
      }
    }
  };

  const changeSel = ({ value }) => {
    const send = { ...expense, expense_type: value };
    dispatch(changeExpense(send));
  };

  const changeAmount = (e) => {
    const num = e.target.value;

    if (/^\d*\.?\d*$/.test(num) || num === "") {
      const send = { ...expense, amount: num };
      dispatch(changeExpense(send));
    }
  };

  return (
    <>
      <NavMenu navText={"Расходы"} />
      <div className="parentBlockSpending">
        <div className="inputBlock">
          <div className="selectBlock">
            <Selects
              list={listCategExpense}
              activeValue={expense?.expense_type}
              onChange={changeSel}
              placeholder={"Выберите категорию"}
            />
          </div>
          <input
            value={expense?.amount}
            onChange={changeAmount}
            placeholder="Сумма"
            maxLength={7}
          />
          <button onClick={addExpense}>+</button>
        </div>
        <div className="inputComment">
          <input
            value={expense.comment}
            onChange={(e) =>
              dispatch(changeExpense({ ...expense, comment: e.target.value }))
            }
            placeholder="Комментарий"
          />
        </div>
        <p className="mainTitleSpernding">Расходы</p>
        <ListExpense />
      </div>
    </>
  );
};

export default StoreSpendingPage;
