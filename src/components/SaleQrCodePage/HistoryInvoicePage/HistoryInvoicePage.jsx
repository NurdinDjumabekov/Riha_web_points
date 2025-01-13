///// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

////// helpers
import { roundingNum } from "../../../helpers/amounts";
import { ru } from "date-fns/locale";
import { format } from "date-fns";

///// fns
import { getHistoryInvoice } from "../../../store/reducers/saleSlice";

////// components
import { Table, TableBody, TableCell, Tooltip } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import ReactDatePicker from "react-datepicker";
import NavPrev from "../../../common/NavPrev/NavPrev";

////// styles
import "./style.scss";

const HistoryInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());

  const { listHistoryInvoice } = useSelector((state) => state.saleSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  useEffect(() => {
    const send = { date: format(new Date(), "dd.MM.yyyy", { locale: ru }) };
    dispatch(getHistoryInvoice({ ...data, ...send }));
  }, []);

  function onChangeDate(e) {
    const dateSend = format(e, "dd.MM.yyyy", { locale: ru });
    setDate(e);
    dispatch(getHistoryInvoice({ ...data, date: dateSend }));
  }

  const objStatus = {
    0: { text: "Ожидание", color: "red" },
    1: { text: "Отменено", color: "red" },
    2: { text: "Подтверждён", color: "#00ab55" },
  };

  const clickInvoice = (obj) => {
    if (obj?.status == 2) {
      navigate(`/sale_qr_code/view_prods`, { state: obj });
    } else {
      navigate(`/sale_qr_code/main`, {
        state: { invoice_guid: obj?.invoice_guid, type: 1 },
      });
    }
  };

  return (
    <div className="historyInvoice">
      <div className="header">
        <div className="titleInAllPage">
          <NavPrev />
          <h3 className="titlePage">История продаж</h3>
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

      <div className="historyInvoice__table">
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "100%" }}
          className="scroll_table standartTable"
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: "8%" }}>
                  №
                </TableCell>
                <TableCell style={{ width: "23%" }}>Дата</TableCell>
                <TableCell align="left" style={{ width: "23%" }}>
                  Итоговая сумма
                </TableCell>
                <TableCell align="left" style={{ width: "23%" }}>
                  Статус
                </TableCell>
                <TableCell align="left" style={{ width: "23%" }}>
                  Продавец
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listHistoryInvoice?.map((row, index) => (
                <TableRow key={index} onClick={() => clickInvoice(row)}>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{ width: "8%" }}
                  >
                    {row?.codeid}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "23%" }}
                  >
                    {row?.date}
                  </TableCell>
                  <TableCell align="left" style={{ width: "23%" }}>
                    {roundingNum(row?.total_price) || "0"} сом
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "23%",
                      color: objStatus?.[row?.status]?.color,
                    }}
                  >
                    {objStatus?.[row?.status].text}
                  </TableCell>
                  <TableCell align="left" style={{ width: "23%" }}>
                    {row?.seller || "Джумабеков Нурдин"}
                  </TableCell>
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell colSpan={4} align="left" className="footerTable">
                  Итого к оплате
                </TableCell>
                <TableCell colSpan={2} align="left">
                  {+totalSumPrice(listProds)} сом
                </TableCell>
                <TableCell
                  colSpan={1}
                  align="left"
                  style={{ fontWeight: "bold" }}
                ></TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HistoryInvoicePage;
