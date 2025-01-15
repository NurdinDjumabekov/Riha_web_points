////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// components
import NavPrev from "../../common/NavPrev/NavPrev";
import ReactDatePicker from "react-datepicker";

////// fns
import { getReportZ } from "../../store/reducers/reportSlice";

////style
import "./style.scss";

///// helpers
import { ru } from "date-fns/locale";
import { format } from "date-fns";

const ReportPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());

  function onChangeDate(e) {
    const date = format(e, "dd.MM.yyyy", { locale: ru });
    setDate(e);
    dispatch(getReportZ({ date }));
  }

  function getData() {
    const date = format(new Date(), "dd.MM.yyyy", { locale: ru });
    dispatch(getReportZ({ date }));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="listInvoices reports">
      <div className="header">
        <div className="titleInAllPage">
          <NavPrev />
          <h3>Отчёт за день</h3>
        </div>
        <div className="date">
          <ReactDatePicker
            selected={date}
            onChange={onChangeDate}
            yearDropdownItemNumber={100}
            placeholderText="ДД.ММ.ГГГГ"
            shouldCloseOnSelect={true}
            scrollableYearDropdown
            dateFormat="dd.MM.yyyy"
            locale={ru}
            maxDate={new Date()}
          />
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default ReportPage;
