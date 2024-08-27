////// hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ru from "date-fns/locale/ru";

/////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import DatePicker, { registerLocale } from "react-datepicker";

////// imgs
import date from "../../../assets/images/date.png";
import arrow from "../../../assets/icons/arrowNav.svg";

/////// style
import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";
import { transformDateTime } from "../../../helpers/transformDate";
import { getListSoldProd } from "../../../store/reducers/requestSlice";
import { useDispatch } from "react-redux";

registerLocale("ru", ru);

const SortDateSaleProd = ({ guidInvoice, seller_guid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const openDate = () => setOpen(true);
  const closeDate = () => setOpen(false);

  const onChange = (date) => {
    setStartDate(date);
    const dateSort = transformDateTime(date); //// форматирую время
    dispatch(getListSoldProd({ guidInvoice, dateSort, seller_guid })); //// отправка запроса для get данных
    closeDate(false);
  };

  return (
    <div className="dateSort">
      <NavMenu>
        <button className="actions" onClick={() => navigate(-1)}>
          <img src={arrow} alt="<" />
          <p>Список продаж</p>
        </button>
        <button className="actions date" onClick={openDate}>
          <img src={date} alt="date" />
        </button>
        {open && (
          <div className="blockDate">
            <DatePicker
              selected={startDate}
              onChange={onChange}
              onClickOutside={() => setOpen(false)}
              inline
              maxDate={new Date()}
              locale="ru"
            />
          </div>
        )}
      </NavMenu>
    </div>
  );
};

export default SortDateSaleProd;
