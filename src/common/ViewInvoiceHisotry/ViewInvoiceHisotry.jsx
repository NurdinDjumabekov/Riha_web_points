//// hooks
import { useDispatch } from "react-redux";
import { formatCount, roundingNum } from "../../helpers/amounts";
import { useLocation, useNavigate } from "react-router-dom";

/////fns

////style
import "./style.scss";

//// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import NavPrev from "../../assets/MyIcons/NavPrev";

const ViewInvoiceHisotry = ({ list, title, keyLink }) => {
  const navigate = useNavigate();

  const objStatus = {
    0: { text: "Не подтверждено", color: "red" },
    1: { text: "Подтверждено", color: "green" },
    2: { text: "Принят", color: "green" },
  };

  const nav = (guidInvoice) => navigate(keyLink, { state: { guidInvoice } });

  return (
    <div className="listInvoices soputkaBody">
      <div className="titleInAllPage">
        <NavPrev />
        <h3>{title}</h3>
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
            {list?.map((item) => (
              <TableRow
                key={item?.codeid}
                className="tableInvoice"
                onClick={() => nav(item?.invoice_guid)}
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
                  {item?.agent}
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  {item?.date}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    width: "15%",
                    color: objStatus?.[item?.status]?.color,
                  }}
                >
                  {objStatus?.[item?.status]?.text}
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
  );
};

export default ViewInvoiceHisotry;
