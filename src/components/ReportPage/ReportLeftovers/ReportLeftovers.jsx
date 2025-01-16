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

const ReportLeftovers = ({ list, title, titleTB, keys }) => {
  return (
    <div className="reportRealization reportSummaryWeekPoints">
      <h5>{title}</h5>
      <div className="reportSummaryWeekPoints__inner">
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "100%" }}
          className="scroll_table standartTable"
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: "10%" }}>
                  {titleTB?.[1] || "№"}
                </TableCell>
                <TableCell align="left" style={{ width: "60%" }}>
                  {titleTB?.[2] || "Наименование"}
                </TableCell>
                <TableCell align="left" style={{ width: "30%" }}>
                  {titleTB?.[3] || "Сумма"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map((row) => (
                <TableRow key={row?.guid}>
                  <TableCell align="center" style={{ width: "10%" }}>
                    {keys?.[1] || row?.id}
                  </TableCell>
                  <TableCell align="left" style={{ width: "60%" }}>
                    {keys?.[2] || row?.name}
                  </TableCell>
                  <TableCell align="left" style={{ width: "30%" }}>
                    {keys?.[3] || row?.sum} сом
                  </TableCell>
                </TableRow>
              ))}
              {/* {list?.length == 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Нет данных для отображения
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell align="center" component="th" scope="row">
                    Итого
                  </TableCell>
                  <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    colSpan={2}
                  ></TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {list?.[0]?.total_bs_points} сом
                  </TableCell>
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ReportLeftovers;
