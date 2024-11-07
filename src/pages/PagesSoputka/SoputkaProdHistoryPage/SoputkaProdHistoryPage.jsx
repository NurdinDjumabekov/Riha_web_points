//// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

//// redux
import { confirmSoputka } from "../../../store/reducers/requestSlice";
import { deleteSoputkaProd } from "../../../store/reducers/requestSlice";
import { getListSoputkaProd } from "../../../store/reducers/requestSlice";

//// helpers
import {
  formatCount,
  roundingNum,
  sumSoputkaProds,
} from "../../../helpers/amounts";

/////components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import { RenderResult } from "../../../common/RenderResult/RenderResult";
import ResultCounts from "../../../common/ResultCounts/ResultCounts";
import NavMenu from "../../../common/NavMenu/NavMenu";
import Krest from "../../../common/Krest/Krest";

//// style
import "./style.scss";
import DeleteIcon from "../../../assets/MyIcons/DeleteIcon";

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

  const confirmBtn = () => {
    dispatch(confirmSoputka({ invoice_guid: guidInvoice, navigate }));
    /// подтверждение накладной сопутки
  };

  const addProd = () => {
    navigate(`/sale_qr_code/main`, {
      state: { invoice_guid: guidInvoice, type: 2 },
    });
    /// д0бавление товара в накладную сопутки
  };

  const del = (product_guid) => {
    dispatch(deleteSoputkaProd({ product_guid, getData }));
    setModalItemGuid(null);
    /// удаление товара в накладную сопутки
  };

  const status = listProdSoputka?.[0]?.status === 0; /// 0 - не подтверждён

  const listData = listProdSoputka?.[0]?.list;

  return (
    <>
      <div className="everyProd soputkaHistoryParent">
        {status && (
          <div className="actionBlockHeader">
            <button className="saveAction" onClick={() => setConfirm(true)}>
              Подтвердить принятие
            </button>
            <button className="saveAction" onClick={addProd}>
              Добавить товар
            </button>
          </div>
        )}
        <h3 className="titlePage">{`Накладная № ${listData?.[0]?.codeid}`}</h3>
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
                  Цена за кг (шт)
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
              {listData?.map((item) => (
                <>
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
                      {roundingNum(item?.sale_price)} сом
                    </TableCell>
                    <TableCell align="left" style={{ width: "20%" }}>
                      {roundingNum(
                        +item?.sale_price *
                          (+item?.count_usushka || +item?.count)
                      )}{" "}
                      сом
                    </TableCell>
                    <TableCell align="left" style={{ width: "8%" }}>
                      <button
                        onClick={() => setModalItemGuid(item?.guid)}
                        className="del"
                      >
                        <DeleteIcon width={19} height={19} color={"red"} />
                      </button>
                    </TableCell>
                  </TableRow>
                  <ConfirmationModal
                    visible={modalItemGuid == item?.guid}
                    message="Отменить добавление ?"
                    onYes={() => del(item?.guid)}
                    onNo={() => setModalItemGuid(null)}
                    onClose={() => setModalItemGuid(null)}
                  />
                </>
              ))}
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
