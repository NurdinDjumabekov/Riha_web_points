////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

////// style
import "./style.scss";

////// components
import { Table, TableBody, TableCell, Tooltip } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// fns

////// icons

///// helpers

const ReportPostavshik = () => {
  const { listReport } = useSelector((state) => state.reportSlice);

  return (
    <div className="reportRealization reportSummaryWeekPay">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%" }}
        className="scroll_table standartTable"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ width: "14%" }}>
                Дата
              </TableCell>
              <TableCell align="left" style={{ width: "14%" }}>
                Поставщик
              </TableCell>
              <TableCell align="left" style={{ width: "14%" }}>
                Приход без накрутки
              </TableCell>
              <TableCell align="left" style={{ width: "14%" }}>
                Приход с накруткой
              </TableCell>
              <TableCell align="left" style={{ width: "14%" }}>
                Касса
              </TableCell>
              <TableCell align="left" style={{ width: "14%" }}>
                Возрат по цене ф.т.
              </TableCell>
              <TableCell align="left" style={{ width: "14%" }}>
                Расходы
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listReport?.suppliers?.map((row) => (
              <TableRow key={`${row?.guid}`}>
                <TableCell align="left" style={{ width: "14%" }}>
                  {row?.date}
                </TableCell>
                <TableCell align="left" style={{ width: "14%" }}>
                  {row?.name}
                </TableCell>
                <TableCell align="left" style={{ width: "14%" }}>
                  {row?.prihod_with}
                </TableCell>
                <TableCell align="left" style={{ width: "14%" }}>
                  {row?.prihod_without}
                </TableCell>
                <TableCell align="left" style={{ width: "14%" }}>
                  {row?.kassa} сом
                </TableCell>
                <TableCell align="left" style={{ width: "14%" }}>
                  {row?.return} сом
                </TableCell>
                <TableCell align="left" style={{ width: "14%" }}>
                  {row?.spending}
                </TableCell>
              </TableRow>
            ))}
            {/* {reportSummary?.week?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Нет данных для отображения
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell align="left" component="th" scope="row">
                  Итого
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {reportSummary?.week?.[0]?.income_total} сом
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {reportSummary?.week?.[0]?.outcome_total} сом
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {reportSummary?.week?.[0]?.kassa_total} сом
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {reportSummary?.week?.[0]?.return_total} сом
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {reportSummary?.week?.[0]?.spending_total} сом
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {reportSummary?.week?.[0]?.leftovers_day_total} сом
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReportPostavshik;
