////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

////// componnets
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// style
import "./style.scss";

////// fns
import { delExpenseTT } from "../../../store/reducers/requestSlice";
import { roundingNum } from "../../../helpers/amounts";
import DeleteIcon from "../../../assets/MyIcons/DeleteIcon";

const ListExpense = ({ getData }) => {
  const dispatch = useDispatch();

  const { listExpense } = useSelector((state) => state.requestSlice);
  const { seller_guid } = useSelector((state) => state.saveDataSlice.data);

  const [del, setDel] = useState(""); //// для модалки удаления расходов

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
                <TableCell style={{ width: "20%" }}>Трата</TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  Дата
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  Cумма
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  Статус
                </TableCell>
                <TableCell align="center" style={{ width: "25%" }}>
                  Комментарий
                </TableCell>
                <TableCell align="center" style={{ width: "5%" }}>
                  *
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listExpense?.map((row, index) => (
                <TableRow key={row?.guid}>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{ width: "5%" }}
                  >
                    {listExpense?.length - index}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "20%" }}
                  >
                    {row?.name}
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    {row?.date_system}
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    {roundingNum(row?.amount)} сом
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "15%",
                      color: objType?.[+row?.status]?.color,
                    }}
                  >
                    {objType?.[+row?.status]?.text}
                  </TableCell>
                  <TableCell align="left" style={{ width: "25%" }}>
                    {row?.comment ? row?.comment : "..."}
                  </TableCell>
                  <TableCell align="left" style={{ width: "5%" }}>
                    {+row?.status == 0 ? (
                      <div className="delIcon">
                        <button onClick={() => setDel(row?.guid)}>
                          <DeleteIcon width={19} height={19} color={"red"} />
                        </button>
                      </div>
                    ) : (
                      "..."
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
