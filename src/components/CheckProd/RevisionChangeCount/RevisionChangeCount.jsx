///// components
import Modals from "../../../common/Modals/Modals";
import Krest from "../../../common/Krest/Krest";

///// hooks
import { useDispatch, useSelector } from "react-redux";

///// fns
import { changeListActionLeftovers } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";

const RevisionChangeCount = ({ objTemporary, setObjTemporary, inputRef }) => {
  const dispatch = useDispatch();

  const { listActionLeftovers } = useSelector((state) => state.requestSlice);

  const onClose = () => setObjTemporary({});

  const changeCount = () => {
    const guidProd = objTemporary?.change_end_outcome;
    const products = listActionLeftovers?.map((i) => ({
      ...i,
      change_end_outcome:
        i?.guid == objTemporary?.guid ? +guidProd : +i?.change_end_outcome,
    }));

    dispatch(changeListActionLeftovers(products));
    ///// для ревизии накладной с продуктами
    onClose();
  };

  const onChange = (e) => {
    const text = e.target.value;

    if (/^\d*\.?\d*$/.test(text)) {
      setObjTemporary({ ...objTemporary, change_end_outcome: text });
    }
  };

  return (
    <Modals openModal={!!objTemporary?.guid} setOpenModal={onClose}>
      <div className="checkModal">
        <div className="checkModal__inner">
          <h5>{objTemporary?.product_name} </h5>
          <Krest onClick={onClose} />
          <div className="addDataBlock">
            <div className="inputBlock">
              <p>
                Введите{" "}
                {objTemporary?.unit_codeid == 1
                  ? "кол-во товара"
                  : "вес товара"}{" "}
                ({objTemporary?.unit})
              </p>
              <input
                value={objTemporary?.change_end_outcome}
                onChange={onChange}
                maxLength={8}
                ref={inputRef}
              />
            </div>
            <button onClick={changeCount}>Изменить</button>
          </div>
        </div>
      </div>
    </Modals>
  );
};

export default RevisionChangeCount;
