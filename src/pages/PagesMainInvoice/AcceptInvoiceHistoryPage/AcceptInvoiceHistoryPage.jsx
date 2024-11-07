////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////// components
import EveryMyInvoice from "../../../components/MainInvoiceProd/EveryMyInvoice/EveryMyInvoice";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// fns
import { getAcceptInvoice } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";

const AcceptInvoiceHistoryPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.saveDataSlice);

  const { listAcceptInvoice } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getData = () => dispatch(getAcceptInvoice(data?.seller_guid));

  const screns = [
    "/main_invoice/accept_detailed",
    "/main_invoice/every_accept_inv",
  ];

  return (
    <div className="listInvoices">
      <h3 className="titlePage">Список принятых накладных</h3>
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
            {listAcceptInvoice?.map((item) => (
              <EveryMyInvoice key={item?.guid} obj={item} screns={screns} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AcceptInvoiceHistoryPage;
