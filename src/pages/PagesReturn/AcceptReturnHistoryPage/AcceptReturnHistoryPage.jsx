/////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// components
import EveryMyInvoice from "../../../components/MainInvoiceProd/EveryMyInvoice/EveryMyInvoice";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

/////// fns
import { getAcceptInvoiceReturn } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";
import NavPrev from "../../../common/NavPrev/NavPrev";

const AcceptReturnHistoryPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.saveDataSlice);

  const { listAcceptInvoiceReturn } = useSelector(
    (state) => state.requestSlice
  );

  const getData = () => dispatch(getAcceptInvoiceReturn(data?.seller_guid));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getData();
  }, []);

  const screns = ["/return/detailed", "/return/every"];

  return (
    <div className="listInvoices blockListHistory">
      <div className="titleInAllPage">
        <NavPrev />
        <h3>Список накладных возврат</h3>
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
              <TableCell align="center" style={{ width: "5%" }}>
                ...
              </TableCell>
              <TableCell style={{ width: "25%" }}>Агент</TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Дата
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Статус
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Итоговая сумма
              </TableCell>
              <TableCell align="left" style={{ width: "20%" }}>
                Комментарий
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listAcceptInvoiceReturn?.map((item) => (
              <EveryMyInvoice key={item?.guid} obj={item} screns={screns} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AcceptReturnHistoryPage;
