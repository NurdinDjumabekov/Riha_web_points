////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// components
import EveryMyInvoice from "../../../components/MainInvoiceProd/EveryMyInvoice/EveryMyInvoice";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// fns
import { getMyReturnInvoice } from "../../../store/reducers/requestSlice";

///// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

////style
import "./style.scss";

const MyReturnsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listMyInvoiceReturn } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const getData = () => {
    dispatch(getMyReturnInvoice(data?.seller_guid));
  };

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getHistory = () => navigate("/return/accept");

  const screns = ["/return/detailed", "/return/every"];

  return (
    <div className="listInvoices acceptInvoiceProdPage">
      <div className="header">
        <h3 className="titlePage">Список накладных для воврата</h3>
        <button className="saveAction" onClick={getHistory}>
          <LibraryAddIcon sx={{ width: 16, height: 16 }} />
          <p>Список принятых накладных</p>
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
            {listMyInvoiceReturn?.map((item) => (
              <EveryMyInvoice key={item?.guid} obj={item} screns={screns} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyReturnsPage;
