////// hooks
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// components
import { BottomSheet } from "react-spring-bottom-sheet";

////// style
import "./style.scss";

/////// fns
import { getListSoldProd } from "../../../store/reducers/requestSlice.js";
import { changeModalDate } from "../../../store/reducers/stateSlice.js";

////// helpers
import { listTimes } from "../../../helpers/Data.js";

const ModalSortProds = ({ props }) => {
  const { seller_guid, guidInvoice } = props;

  const dispatch = useDispatch();

  const { modalDate } = useSelector((state) => state.stateSlice);

  const closeDateBottom = () => dispatch(changeModalDate({ periods: false }));

  const clickDate = ({ id }) => {
    closeDateBottom();
    dispatch(getListSoldProd({ guidInvoice, dateSort: id, seller_guid }));
  };

  const openDatePeriod = () =>
    dispatch(changeModalDate({ periods: false, dates: true }));
  ///// открытие модалки для выбора периода

  return (
    <BottomSheet
      open={modalDate?.periods}
      onDismiss={closeDateBottom}
      defaultSnap={({ maxHeight }) => maxHeight * 0.6}
      snapPoints={({ maxHeight }) => maxHeight * 0.6}
    >
      <div className="listDates">
        <div className="listDates__inner">
          {listTimes?.map((item) => (
            <button
              className="everyList"
              onClick={() => clickDate(item)}
              key={item.id}
            >
              {item?.name}
            </button>
          ))}
        </div>
        <button onClick={openDatePeriod}>Выбрать период</button>
        <button className="everyList" onClick={closeDateBottom}>
          Отмена
        </button>
      </div>
    </BottomSheet>
  );
};

export default ModalSortProds;
