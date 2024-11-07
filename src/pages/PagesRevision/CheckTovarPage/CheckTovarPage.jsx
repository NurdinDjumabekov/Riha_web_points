////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

///// fns
import { clearListSellersPoints } from "../../../store/reducers/requestSlice";
import { getHistoryRevision } from "../../../store/reducers/requestSlice";
import { getSellersEveryPoint } from "../../../store/reducers/requestSlice";

///// components
import ModalWorkShop from "../../../components/CheckProd/ModalWorkShop/ModalWorkShop";
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

///// style
import "./style.scss";

///// helpers
import { roundingNum } from "../../../helpers/amounts";
import { statusColor, statusRevision } from "../../../helpers/Data";

const CheckTovarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false); /// выбор продавца для ревизии

  const { data } = useSelector((state) => state.saveDataSlice);
  const { listHistoryRevision } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getData = async () => {
    dispatch(clearListSellersPoints());
    ///// очищаю список продавцов каждой точки

    const { seller_guid } = data;

    ////// get список продавцов определенной точки
    dispatch(getSellersEveryPoint(seller_guid));

    ////// get историю ревизии
    dispatch(getHistoryRevision(seller_guid));
  };

  const navLick = () => navigate("/revision/request");

  const lookInvoice = ({ guid, status }) => {
    if (status == 2) {
      navigate("/main_invoice/every_accept_inv", { state: { guid, type: 3 } });
    } else {
      navigate(`/sale_qr_code/main`, {
        state: { invoice_guid: guid, type: 3 },
      });
    }
  };

  return (
    <>
      <ModalWorkShop openModal={openModal} setOpenModal={setOpenModal} />
      <div className="listInvoices revisionBlock">
        <div className="header">
          <h3 className="titlePage">История вашей ревизии</h3>
          <div>
            <button className="saveAction" onClick={() => setOpenModal(true)}>
              {/* <LibraryAddIcon sx={{ width: 16, height: 16 }} /> */}
              <p>Выбрать продавца для ревизии</p>
            </button>
            <button className="saveAction" onClick={navLick}>
              {/* <LibraryAddIcon sx={{ width: 16, height: 16 }} /> */}
              <p>Запросы других продавцов</p>
            </button>
          </div>
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
                <TableCell style={{ width: "25%" }}>Продавцу</TableCell>
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
              {listHistoryRevision?.map((item) => (
                <TableRow
                  key={item?.codeid}
                  className="tableInvoice"
                  onClick={() => lookInvoice(item)}
                >
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{ width: "5%" }}
                  >
                    {item?.codeid}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "5%", textAlign: "center" }}
                  >
                    <input type="checkbox" value={true} />
                  </TableCell>
                  <TableCell align="left" style={{ width: "25%" }}>
                    {item?.seller_to}
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    {item?.date}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: "15%", color: statusColor?.[item?.status] }}
                  >
                    {statusRevision?.[item.status]}
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    {roundingNum(item?.total_price)} сом
                  </TableCell>

                  <TableCell align="left" style={{ width: "20%" }}>
                    {item?.comment || "..."}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CheckTovarPage;
