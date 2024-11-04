/////// hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

/////// componnets
import { transformDatePeriod } from "../../../helpers/transformDate.js";
import ru from "date-fns/locale/ru";

/////// fns
import { getListSoldProd } from "../../../store/reducers/requestSlice.js";
import { changeModalDate } from "../../../store/reducers/stateSlice.js";

/////// components
import DatePicker, { registerLocale } from "react-datepicker";

registerLocale("ru", ru);

const ModalSortPeriodProds = ({ props }) => {
  const dispatch = useDispatch();
  const { seller_guid, guidInvoice } = props;

  const { modalDate } = useSelector((state) => state.stateSlice);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const closeDateBottom = () => dispatch(changeModalDate({ dates: false }));

  const clickDate = () => {
    const start = transformDatePeriod(startDate);
    const end = transformDatePeriod(endDate);
    const dateSort = `${start}-${end}`;
    dispatch(getListSoldProd({ guidInvoice, dateSort, seller_guid }));
    closeDateBottom();
  };

  const handleStartDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      {/* <BottomSheet
        open={modalDate?.dates}
        onDismiss={closeDateBottom}
        defaultSnap={({ maxHeight }) => maxHeight * 0.4}
        snapPoints={({ maxHeight }) => maxHeight * 0.4}
      >
        <div className="listDatesPeriod">
          <div className="listDatesPeriod__inner">
            <h6>Начало истории</h6>
            <button onClick={openStartDateModal}>
              {transformDate(startDate)}
            </button>
          </div>
          <div className="listDatesPeriod__inner">
            <h6>Конец истории</h6>
            <button onClick={openEndDateModal}>{transformDate(endDate)}</button>
          </div>

          <button onClick={clickDate} className="actionsDate">
            Готово
          </button>
        </div>
      </BottomSheet> */}
      {modalDate?.dates && (
        <div className="blockDate">
          <div className="shadowDate" onClick={closeDateBottom}></div>
          <div className="blockDate__inner">
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              // onClickOutside={closeDateBottom}
              maxDate={new Date()}
              locale="ru"
            />
            <button onClick={clickDate} className="actionsDate">
              Поиск
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalSortPeriodProds;
