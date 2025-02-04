////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// fns
import { getRevisionRequest } from "../../../store/reducers/requestSlice";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import NavPrev from "../../../common/NavPrev/NavPrev";

//// style
import "./style.scss";

//// helpers
import { statusRevisionAccept } from "../../../helpers/Data";
import { roundingNum } from "../../../helpers/amounts";

const RevisionRequestPage = () => {
  ////// каждый запрос других пр0давцов для подтверждения ревизии
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { listRequestRevision } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const getData = () => dispatch(getRevisionRequest(data?.seller_guid));

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const lookInvoice = ({ guid }) => {
    navigate("/revision/every_accept_inv", { state: { guid, type: 3 } });
  };

  return (
    <div className="revisionRequest">
      <div className="titleInAllPage">
        <NavPrev />
        <h3>Запросы других продавцов</h3>
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
                Итоговая сумма
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
            {listRequestRevision?.map((item) => (
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
                <TableCell align="left" style={{ width: "20%" }}>
                  {item?.seller_to}
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  {item?.date}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    width: "15%",
                    color: statusRevisionAccept?.[item?.status]?.c,
                  }}
                >
                  {statusRevisionAccept?.[item.status]?.t}
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  {roundingNum(item?.total_price)} сом
                </TableCell>

                <TableCell align="left" style={{ width: "15%" }}>
                  {item?.comment || "..."}
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  <div className="edit">{item?.leftovers_pay || 0} сом</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RevisionRequestPage;
