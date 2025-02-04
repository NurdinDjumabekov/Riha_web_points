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
import NavPrev from "../../../common/NavPrev/NavPrev";

///// style
import "./style.scss";

///// helpers
import { roundingNum } from "../../../helpers/amounts";
import { statusRevision } from "../../../helpers/Data";
import ModaRevisonlPay from "../../../components/CheckProd/ModaRevisonlPay/ModaRevisonlPay";
import EditIcon from "../../../assets/MyIcons/EditIcon";

const CheckTovarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false); /// выбор продавца для ревизии
  const [modalPay, setModalPay] = useState({}); /// для модалки вводя остатка денег

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
    const state = { invoice_guid: guid, type: 3 };
    if (status == 2) {
      navigate("/main_invoice/every_accept_inv", { state: { guid, type: 3 } });
    } else {
      navigate(`/revision/qr_scan`, { state });
    }
  };

  return (
    <>
      <ModalWorkShop openModal={openModal} setOpenModal={setOpenModal} />
      <div className="listInvoices revisionBlock">
        <div className="header">
          <div className="titleInAllPage moreTitle">
            <NavPrev />
            <h3>Накладные созданные вами</h3>
          </div>
          <div>
            <button className="saveAction" onClick={() => setOpenModal(true)}>
              <p>Выбрать продавца для ревизии</p>
            </button>
            <button className="saveAction" onClick={navLick}>
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
                <TableCell style={{ width: "20%" }}>Продавцу</TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  Дата
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  Статус
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  Cумма
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  Комментарий
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  Остаток денег
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listHistoryRevision?.map((item) => (
                <TableRow key={item?.codeid} className="tableInvoice">
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{ width: "5%" }}
                    onClick={() => lookInvoice(item)}
                  >
                    {item?.codeid}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "5%", textAlign: "center" }}
                    onClick={() => lookInvoice(item)}
                  >
                    <input type="checkbox" value={true} />
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: "20%" }}
                    onClick={() => lookInvoice(item)}
                  >
                    {item?.seller_to}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: "15%" }}
                    onClick={() => lookInvoice(item)}
                  >
                    {item?.date}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: "15%",
                      color: statusRevision?.[item?.status]?.c,
                    }}
                    onClick={() => lookInvoice(item)}
                  >
                    {statusRevision?.[item?.status]?.t}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ width: "15%" }}
                    onClick={() => lookInvoice(item)}
                  >
                    {roundingNum(item?.total_price)} сом
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{ width: "15%" }}
                    onClick={() => lookInvoice(item)}
                  >
                    {item?.comment || "..."}
                  </TableCell>
                  <TableCell align="left" style={{ width: "15%" }}>
                    <div className="edit">
                      {item?.leftovers_pay || 0} сом
                      <EditIcon
                        width={17}
                        height={17}
                        onClick={() => setModalPay(item)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ModaRevisonlPay
        modalState={modalPay}
        setModalState={setModalPay}
        getData={getData}
      />
    </>
  );
};

export default CheckTovarPage;
