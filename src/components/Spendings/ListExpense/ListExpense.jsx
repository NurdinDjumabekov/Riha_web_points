import { useSelector } from "react-redux";

////style
import "./style.scss";

const ListExpense = () => {
  const { listExpense } = useSelector((state) => state.requestSlice);

  const emptyData = listExpense?.length === 0;

  if (emptyData) {
    return <p className="noneData">Список пустой</p>;
  }

  const objType = {
    0: { text: "Ожидание", color: "red" },
    1: { text: "Отменено админом", color: "red" },
    2: { text: "Одобрено", color: "green" },
  };

  return (
    <div className="spendingList">
      {listExpense?.map((item) => (
        <div className="everyProdSpending">
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
        </div>
      ))}
    </div>
  );
};

export default ListExpense;
