//// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react";

//// fns
import { confirmSoputka } from "../../../store/reducers/requestSlice";
import { deleteSoputkaProd } from "../../../store/reducers/requestSlice";
import { getListSoputkaProd } from "../../../store/reducers/requestSlice";

//// helpers
import { roundingNum } from "../../../helpers/amounts";

///// icons
import DeleteIcon from "../../../assets/MyIcons/DeleteIcon";

/////components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import NavPrev from "../../../common/NavPrev/NavPrev";

//// style
import "./style.scss";

const SoputkaProdHistoryPage = () => {
  //// история каждой накладной сапутки
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { guidInvoice } = location.state;

  const [modalItemGuid, setModalItemGuid] = useState(null); // Состояние для идентификатора элемента, для которого открывается модальное окно

  const [confirm, setConfirm] = useState(false); // Состояние для идентификатора элемента, для которого открывается модальное окно

  const { listProdSoputka } = useSelector((state) => state.requestSlice);

  const getData = () => dispatch(getListSoputkaProd(guidInvoice));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getData();
  }, []);

  const confirmBtn = async () => {
    const send = { invoice_guid: guidInvoice };
    const res = await dispatch(confirmSoputka(send)).unwrap();
    if (res === 1) navigate("/soputka/main");
    /// подтверждение накладной сопутки
  };

  const addProd = () => {
    const state = { invoice_guid: guidInvoice, type: 2 };
    navigate(`/soputka/qr_scan`, { state });
    /// д0бавление товара в накладную сопутки
  };

  const del = (product_guid) => {
    dispatch(deleteSoputkaProd({ product_guid, getData }));
    setModalItemGuid(null);
    /// удаление товара в накладную сопутки
  };

  const status = listProdSoputka?.[0]?.status == 0; /// 0 - не подтверждён

  const listData = listProdSoputka?.[0]?.list;

  return (
    <>
      <div className="everyProd soputkaHistoryParent">
        <div className="header">
          <div className="titleInAllPage">
            <NavPrev />
            <h3 className="titlePage">{`Накладная № ${listProdSoputka?.[0]?.codeid}`}</h3>
          </div>
          {status && (
            <div className="actionBlockHeader">
              <button className="saveAction" onClick={() => setConfirm(true)}>
                Подтвердить
              </button>
              <button className="saveAction" onClick={addProd}>
                Добавить товар
              </button>
            </div>
          )}
        </div>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "100%" }}
          className="scroll_table standartTable"
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: "10%" }}>
                  №
                </TableCell>
                <TableCell style={{ width: "25%" }}>Наименование</TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  Кол-во (вес)
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  Отпускная цена
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  Итоговая сумма
                </TableCell>
                <TableCell align="center" style={{ width: "8%" }}>
                  ...
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData?.map((item, index) => (
                <Fragment key={index}>
                  <TableRow className="tableInvoice">
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      style={{ width: "10%" }}
                    >
                      {item?.codeid}
                    </TableCell>
                    <TableCell align="left" style={{ width: "25%" }}>
                      {item?.product_name}
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      {roundingNum(item?.count)} {item?.unit}
                    </TableCell>
                    <TableCell align="left" style={{ width: "15%" }}>
                      {roundingNum(item?.price)} сом
                    </TableCell>
                    <TableCell align="left" style={{ width: "20%" }}>
                      {roundingNum(+item?.product_price)} сом
                    </TableCell>
                    <TableCell align="left" style={{ width: "8%" }}>
                      {status && (
                        <button
                          onClick={() => setModalItemGuid(item?.guid)}
                          className="del"
                        >
                          <DeleteIcon width={19} height={19} color={"red"} />
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                  <ConfirmationModal
                    visible={modalItemGuid == item?.guid}
                    message="Отменить добавление ?"
                    onYes={() => del(item?.guid)}
                    onNo={() => setModalItemGuid(null)}
                    onClose={() => setModalItemGuid(null)}
                  />
                </Fragment>
              ))}
              <TableRow className="tableInvoice">
                <TableCell align="center" component="th" scope="row">
                  Итого
                </TableCell>
                <TableCell component="th" scope="row" colSpan={3}></TableCell>
                <TableCell align="left" component="th" scope="row" colSpan={2}>
                  {roundingNum(listProdSoputka?.[0]?.total_price)} сом
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ConfirmationModal
        visible={confirm}
        message="Подтвердить ?"
        onYes={() => confirmBtn()}
        onNo={() => setConfirm(false)}
        onClose={() => setConfirm(false)}
      />
    </>
  );
};

export default SoputkaProdHistoryPage;
