////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// components
import EveryMyInvoice from "../../../components/MainInvoiceProd/EveryMyInvoice/EveryMyInvoice";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import NavPrev from "../../../common/NavPrev/NavPrev";

////// fns
import { getMyInvoice } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";

///// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const AcceptInvoiceProdPage = () => {
  ////// загрузки
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listMyInvoice } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const getData = () => dispatch(getMyInvoice(data?.seller_guid));

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getHistory = () => navigate("/main_invoice/accept_history");

  const screns = [
    "/main_invoice/accept_detailed",
    "/main_invoice/every_accept_inv",
  ];

  return (
    <div className="listInvoices acceptInvoiceProdPage">
      <div className="header">
        <div className="titleInAllPage">
          <NavPrev />
          <h3>Список накладных</h3>
        </div>
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
            {listMyInvoice?.map((item) => (
              <EveryMyInvoice key={item?.guid} obj={item} screns={screns} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AcceptInvoiceProdPage;
