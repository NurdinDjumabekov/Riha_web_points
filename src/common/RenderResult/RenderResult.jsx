//// helpers
import { formatCount, roundingNum } from "../../helpers/amounts";

//// style
import "./style.scss";

//// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import NavPrev from "../NavPrev/NavPrev";

export const RenderResult = ({ list, title, keyName }) => {
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
                  {roundingNum(item?.[keyName?.count] || item?.count)}{" "}
                  {item?.unit}
                </TableCell>
                <TableCell align="left" style={{ width: "15%" }}>
                  {roundingNum(item?.[keyName?.price] || item?.price)} сом
                </TableCell>
                <TableCell align="left" style={{ width: "20%" }}>
                  {roundingNum(
                    item?.[keyName?.total_price] || item?.sale_price
                  )}{" "}
                  сом
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="tableInvoice">
              <TableCell align="center" component="th" scope="row">
                Итого
              </TableCell>
              <TableCell scope="row" colSpan={3}></TableCell>
              <TableCell align="left" component="th" scope="row">
                {roundingNum(
                  list?.[0]?.[keyName?.total_price_invoice] ||
                    list?.[0]?.total_price
                )}{" "}
                сом
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
