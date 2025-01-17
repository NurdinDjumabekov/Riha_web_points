////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import GenerateReportPdf from "../../components/ReportPage/GenerateReportPdf/GenerateReportPdf";
import NavPrev from "../../common/NavPrev/NavPrev";
import ReactDatePicker from "react-datepicker";
import ReportLeftovers from "../../components/ReportPage/ReportLeftovers/ReportLeftovers";
import ReportPostavshik from "../../components/ReportPage/ReportPostavshik/ReportPostavshik";

////// fns
import { getReportZ } from "../../store/reducers/reportSlice";

////style
import "./style.scss";

///// helpers
import { ru } from "date-fns/locale";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";

const ReportPage = () => {
  const dispatch = useDispatch();

  const { listReport } = useSelector((state) => state.reportSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const [modalReportPdf, setModalReportPdf] = useState(false);

  const [dateWeek, setDateWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  function onChangeDate(date) {
    setDateWeek(date);
    const start_date = format(
      startOfWeek(date, { weekStartsOn: 1 }),
      "dd.MM.yyyy",
      { locale: ru }
    );
    const end_date = format(
      endOfWeek(date, { weekStartsOn: 1 }),
      "dd.MM.yyyy",
      {
        locale: ru,
      }
    );
    dispatch(getReportZ({ start_date, end_date }));
  }

  function getData() {
    const start_date = format(
      startOfWeek(new Date(), { weekStartsOn: 1 }),
      "dd.MM.yyyy",
      { locale: ru }
    );
    const end_ate = format(
      endOfWeek(new Date(), { weekStartsOn: 1 }),
      "dd.MM.yyyy",
      { locale: ru }
    );
    dispatch(getReportZ({ start_date, end_ate }));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="listInvoices reports">
      <div className="header">
        <div className="titleInAllPage">
          <NavPrev />
          <h3>Отчёт за неделю</h3>
        </div>

        <div>
          <div className="action">
            Сортировка по дате
            <div className="date">
              <ReactDatePicker
                selected={dateWeek}
                onChange={onChangeDate}
                placeholderText="Выберите неделю"
                shouldCloseOnSelect={true}
                scrollableYearDropdown
                dateFormat="dd-MM-yyyy"
                locale={ru}
                showWeekPicker
                maxDate={new Date()}
              />
              <p className="dateText">
                {format(dateWeek, "dd.MM.yyyy")} -{" "}
                {format(addDays(dateWeek, 6), "dd.MM.yyyy")}
              </p>
            </div>
          </div>
          <GenerateReportPdf
            startDate={format(dateWeek, "dd.MM.yyyy")}
            endData={format(addDays(dateWeek, 6), "dd.MM.yyyy")}
            addres={data?.point_name}
            modalReportPdf={modalReportPdf}
            setModalReportPdf={setModalReportPdf}
          />
        </div>
      </div>
      <div className="body">
        <div className="main_report">
          <ReportPostavshik />
        </div>
        <div className="actions_report">
          <div className="start_report">
            <ReportLeftovers
              list={listReport?.debt_point_start}
              title={"Общий долг по точкам на начало"}
              firstTitle={"Дата"}
              firstKey={"date"}
            />
            <ReportLeftovers
              list={listReport?.list_leftovers_start}
              title={"Остатки продукции на начало смены"}
              firstTitle={"Дата"}
              firstKey={"date"}
            />
          </div>

          <div className="end_report">
            <ReportLeftovers
              list={listReport?.debt_point_end}
              title={"Общий долг по точкам на конец"}
              firstTitle={"Дата"}
              firstKey={"date"}
            />
            <ReportLeftovers
              list={listReport?.list_leftovers_end}
              title={"Общий долг по точкам на конец"}
              firstTitle={"Дата"}
              firstKey={"date"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
