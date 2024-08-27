////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

////// componnets
import Krest from "../../../common/Krest/Krest";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

////// style
import "./style.scss";

////// fns
import { delExpenseTT } from "../../../store/reducers/requestSlice";

const ListExpense = ({ getData }) => {
  const dispatch = useDispatch();

  const { listExpense } = useSelector((state) => state.requestSlice);
  const { seller_guid } = useSelector((state) => state.saveDataSlice.data);

  const [del, setDel] = useState(""); //// для модалки удаления расходов

  const emptyData = listExpense?.length === 0;

  if (emptyData) {
    return <p className="noneData">Список пустой</p>;
  }

  const objType = {
    0: { text: "Ожидание", color: "red" },
    1: { text: "Отменено админом", color: "red" },
    2: { text: "Одобрено", color: "green" },
  };

  const delSpending = () => {
    dispatch(delExpenseTT({ getData, seller_guid, del }));
    setDel("");
    ///// удаляю расходы через запрос
  };

  return (
    <>
      <div className="spendingList">
        {listExpense?.map((item) => (
          <div className="everyProdSpending" key={item?.guid}>
            <div className="everyProdSpending__inner">
              <div className="blockTitle">
                <h5>{item?.name}</h5>
                <p>{item?.comment ? item?.comment : "..."}</p>
              </div>
              <div className="blockMoreText">
                <span style={{ color: `${objType?.[+item?.status]?.color}` }}>
                  {objType?.[+item?.status]?.text}
                </span>
                <p>{item?.date_system}</p>
                <b>{item?.amount} сом</b>
              </div>
            </div>
            {item?.cancel_comment && (
              <p className="commentAdmin">{item?.cancel_comment}</p>
            )}
            {+item?.status == 0 && <Krest onClick={() => setDel(item?.guid)} />}
          </div>
        ))}
      </div>
      <ConfirmationModal
        visible={!!del}
        message="Удалить ?"
        onYes={delSpending}
        onNo={() => setDel("")}
        onClose={() => setDel("")}
      />
    </>
  );
};

export default ListExpense;
