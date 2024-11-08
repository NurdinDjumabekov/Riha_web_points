////hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////fns
import { getExpense } from "../../store/reducers/requestSlice";
import { getSelectExpense } from "../../store/reducers/requestSlice";

//////components
import ListExpense from "../../components/Spendings/ListExpense/ListExpense";
import ModalAddSpending from "../../components/Spendings/ModalAddSpending/ModalAddSpending";

////style
import "./style.scss";

///// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const StoreSpendingPage = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.saveDataSlice);

  const [modal, setModal] = useState(false);

  const getData = () => {
    dispatch(getSelectExpense()); ///  список селекта расходов ТТ(их траты)
    dispatch(getExpense(data?.seller_guid)); /// список расходов ТТ(их траты)
  };

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="parentBlockSpending">
      <div className="header">
        <h3 className="titlePage">Список расходов</h3>
        <button className="saveAction" onClick={() => setModal(true)}>
          <LibraryAddIcon sx={{ width: 16, height: 16 }} />
          <p>Добавить трату</p>
        </button>
      </div>

      <ListExpense getData={getData} />
      <ModalAddSpending modal={modal} setModal={setModal} getData={getData} />
    </div>
  );
};

export default StoreSpendingPage;
