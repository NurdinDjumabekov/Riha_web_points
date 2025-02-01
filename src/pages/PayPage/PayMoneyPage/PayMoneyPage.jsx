///// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

///// fns
import { clearListAgents } from "../../../store/reducers/requestSlice";
import { getHistoryBalance } from "../../../store/reducers/requestSlice";
import { getListAgents } from "../../../store/reducers/requestSlice";

///// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import ModalPay from "../../../components/Pay/ModalPay/ModalPay";
import NavPrev from "../../../common/NavPrev/NavPrev";

///// style
import "./style.scss";

//// helpers
import { roundingNum } from "../../../helpers/amounts";
import { typesPay } from "../../../helpers/Data";

///// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const PayMoneyPage = () => {
  ///// оплата ТА (принятие денег ТА)

  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);

  const { data } = useSelector((state) => state.saveDataSlice);

  const { listHistoryBalance } = useSelector((state) => state.requestSlice);

  const getData = () => {
    dispatch(getHistoryBalance(data?.seller_guid));
    dispatch(getListAgents(data?.seller_guid));
  };

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => dispatch(clearListAgents());
  }, []);

  return (
    <div className="containerPay">
      <div className="header">
        <div className="titleInAllPage">
          <NavPrev />
          <h3>Оплаты</h3>
        </div>
        <button className="saveAction" onClick={() => setModalState(true)}>
          <LibraryAddIcon sx={{ width: 16, height: 16 }} />
          <p>+ Произвести оплату</p>
        </button>
      </div>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%" }}
        className="scroll_table standartTable"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "5%" }}>
                №
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Дата
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Сумма
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Получатели
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Тип оплаты
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Статус
              </TableCell>
              <TableCell align="center" style={{ width: "35%" }}>
                Комментарий
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listHistoryBalance?.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ width: "5%" }}
                >
                  {listHistoryBalance?.length - index}
                </TableCell>
                <TableCell component="th" scope="row" style={{ width: "15%" }}>
                  {row?.date_system}
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  {roundingNum(row?.total)} сом
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  {row?.name_contragent || "..."}
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  {typesPay?.[row?.transaction_type]}
                </TableCell>
                <TableCell
                  align="left"
                  style={{ width: "15%", color: "green" }}
                  // style={{ width: "15%" }}
                >
                  Успешно
                </TableCell>
                <TableCell align="left" style={{ width: "35%" }}>
                  {row.comment || "..."}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalPay
        modalState={modalState}
        setModalState={setModalState}
        getData={getData}
      />
    </div>
  );
};

export default PayMoneyPage;
