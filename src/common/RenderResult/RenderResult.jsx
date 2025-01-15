//// helpers
import { formatCount, roundingNum } from "../../helpers/amounts";

//// style
import "./style.scss";

//// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import NavPrev from "../NavPrev/NavPrev";

export const RenderResult = ({ list, title }) => {
  return (
    <div className="everyProd">
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
              <TableCell style={{ width: "35%" }}>Наименование</TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Кол-во (вес)
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Цена за кг (шт)
              </TableCell>
              <TableCell align="left" style={{ width: "15%" }}>
                Итоговая сумма
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((item, index) => (
              <TableRow className="tableInvoice" key={index}>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ width: "5%" }}
                >
                  {index + 1}
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
                  {roundingNum(
                    +item?.price * (+item?.count_usushka || +item?.count)
                  )}{" "}
                  сом
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              className="tableInvoice"
              style={{ background: "rgba(225, 230, 237, 0.149)" }}
            >
              <TableCell align="center" component="th" scope="row" colSpan={4}>
                Итого
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {list?.[0]?.total_price} сом
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
