////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////components
import { Document, Page, Text } from "@react-pdf/renderer";
import { View, PDFViewer } from "@react-pdf/renderer";
import Modals from "../../../common/Modals/Modals";

///// fns

///// icons
import DescriptionIcon from "@mui/icons-material/Description";

//// style
import "./style.scss";
import { styles } from "./style";

///// helpers
import { splitArrayIntoTwoEqualParts } from "../../../helpers/transformLists";

const GenerateReportPdf = (props) => {
  const { startDate, endData, modalReportPdf, setModalReportPdf } = props;
  const { data } = useSelector((state) => state.saveDataSlice);
  const { listReport } = useSelector((state) => state.reportSlice);

  ////// Общий долг по точке на начало
  const { left: left_dolg_start, right: right_dolg_start } =
    splitArrayIntoTwoEqualParts(listReport?.debt_point_start || []);

  ////// Остатки продукции на начало смены
  const { left: left_leftovers_start, right: right_leftovers_start } =
    splitArrayIntoTwoEqualParts(listReport?.list_leftovers_start || []);

  ////// Общий долг по точке на конец
  const { left: left_dolg_end, right: right_dolg_end } =
    splitArrayIntoTwoEqualParts(listReport?.debt_point_end || []);

  ////// Остатки продукции на конец смены
  const { left: left_leftovers_end, right: right_leftovers_end } =
    splitArrayIntoTwoEqualParts(listReport?.list_leftovers_end || []);

  return (
    <div className="generateReportPdf">
      {/* {modalReportPdf && <button className="close">Закрыть</button>} */}
      <div className="actionPdf">
        <button onClick={() => setModalReportPdf(true)}>
          <DescriptionIcon />
          <p>Распечатать отчёт</p>
        </button>
      </div>

      <Modals
        openModal={modalReportPdf}
        setOpenModal={() => setModalReportPdf(false)}
      >
        <PDFViewer>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.header}>
                  Отчет с {startDate} по {endData}, aдрес магазина:{" "}
                  {data?.point_name}
                </Text>
                <Text style={styles.header}>
                  Реализатор: {data?.seller_fio}
                </Text>
              </View>

              {/* ///////////////////////// */}
              <Text style={styles.centerTitle}>
                Общий долг по точкам на начало
              </Text>
              <View style={styles.twoTable}>
                <View style={styles.twoTable}>
                  <View style={[styles.table]}>
                    {left_dolg_start?.map((row, index) => (
                      <View style={styles.tableRow} key={`first-${index}`}>
                        <View style={[styles.tableColBC, styles.indexs]}>
                          <Text style={[styles.tableCellBC, styles.indexInner]}>
                            {row?.id}
                          </Text>
                        </View>
                        <View style={[styles.tableColBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.name || ""}
                          </Text>
                        </View>
                        <View style={[styles.tableColSumBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.dolg || "0"} сом
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View style={[styles.table, styles.leftNonetable]}>
                    {right_dolg_start?.map((row, index) => (
                      <View style={styles.tableRow} key={`second-${index}`}>
                        <View style={[styles.tableColBC, styles.indexs]}>
                          <Text style={[styles.tableCellBC, styles.indexInner]}>
                            {row?.id}
                          </Text>
                        </View>
                        <View style={[styles.tableColBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.name || ""}
                          </Text>
                        </View>
                        <View style={[styles.tableColSumBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.sum || "0"} сом
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View style={[styles.podpisTotal]}>
                <Text style={styles.linetext}>Итого: </Text>
                <Text style={styles.linetext}>
                  {listReport?.debt_point_start_total} сом
                </Text>
              </View>

              {/* ///////////////////////// */}
              <Text style={styles.centerTitle}>
                Остатки продукции на начало смены
              </Text>
              <View style={styles.twoTable}>
                <View style={styles.twoTable}>
                  <View style={[styles.table]}>
                    {left_leftovers_start?.map((row, index) => (
                      <View style={styles.tableRow} key={`first-${index}`}>
                        <View style={[styles.tableColBC, styles.indexs]}>
                          <Text style={[styles.tableCellBC, styles.indexInner]}>
                            {row?.id}
                          </Text>
                        </View>
                        <View style={[styles.tableColBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.name || ""}
                          </Text>
                        </View>
                        <View style={[styles.tableColSumBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.dolg || "0"} сом
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View style={[styles.table, styles.leftNonetable]}>
                    {right_leftovers_start?.map((row, index) => (
                      <View style={styles.tableRow} key={`second-${index}`}>
                        <View style={[styles.tableColBC, styles.indexs]}>
                          <Text style={[styles.tableCellBC, styles.indexInner]}>
                            {row?.id}
                          </Text>
                        </View>
                        <View style={[styles.tableColBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.name || ""}
                          </Text>
                        </View>
                        <View style={[styles.tableColSumBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.sum || "0"} сом
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View style={[styles.podpisTotal]}>
                <Text style={styles.linetext}>Итого: </Text>
                <Text style={styles.linetext}>
                  {listReport?.list_leftovers_start_total} сом
                </Text>
              </View>

              {/* ///////////////////////// */}
              <Text style={styles.centerTitle}>Поставщик</Text>
              <View style={[styles.table, { marginBottom: 20 }]}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol]}>
                    <Text style={[styles.textTitle]}>Дата</Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={styles.textTitle}>Поставщик</Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={styles.textTitle}>Приход без накрутки</Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={styles.textTitle}>Приход с накруткой</Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={styles.textTitle}>Касса</Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={styles.textTitle}>Возрат по цене ф.т.</Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={styles.textTitle}>Расходы</Text>
                  </View>
                </View>
                {listReport?.suppliers?.map((row, index) => (
                  <View style={styles.tableRow} key={index}>
                    <View style={[styles.tableCol]}>
                      <Text style={[styles.tableCell]}>{row?.date}</Text>
                    </View>
                    <View style={[styles.tableCol]}>
                      <Text style={[styles.tableCell]}>{row?.name}</Text>
                    </View>
                    <View style={[styles.tableCol]}>
                      <Text style={[styles.tableCell]}>{row?.prihod_with}</Text>
                    </View>
                    <View style={[styles.tableCol]}>
                      <Text style={[styles.tableCell]}>
                        {row?.prihod_without}
                      </Text>
                    </View>
                    <View style={[styles.tableCol]}>
                      <Text style={[styles.tableCell]}>{row?.kassa} сом</Text>
                    </View>
                    <View style={[styles.tableCol]}>
                      <Text style={[styles.tableCell]}>{row?.return}</Text>
                    </View>
                    <View style={[styles.tableCol]}>
                      <Text style={[styles.tableCell]}>{row?.spending}</Text>
                    </View>
                  </View>
                ))}
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol]}>
                    <Text style={[styles.tableCell]}>Итого</Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={[styles.tableCell]}></Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={[styles.tableCell]}></Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={[styles.tableCell]}></Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={[styles.tableCell]}></Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={[styles.tableCell]}></Text>
                  </View>
                  <View style={[styles.tableCol]}>
                    <Text style={[styles.tableCell]}></Text>
                  </View>
                </View>
              </View>
              <View style={[styles.podpisTotal]}>
                <Text style={styles.linetext}>Долги на конец смены: </Text>
                <Text style={styles.linetext}>
                  {listReport?.result_suppliers} сом
                </Text>
              </View>

              {/* ///////////////////////// */}
              <Text style={styles.centerTitle}>
                Общий долг по точки на начало
              </Text>
              <View style={styles.twoTable}>
                <View style={styles.twoTable}>
                  <View style={[styles.table]}>
                    {left_dolg_end?.map((row, index) => (
                      <View style={styles.tableRow} key={`first-${index}`}>
                        <View style={[styles.tableColBC, styles.indexs]}>
                          <Text style={[styles.tableCellBC, styles.indexInner]}>
                            {row?.id}
                          </Text>
                        </View>
                        <View style={[styles.tableColBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.name || ""}
                          </Text>
                        </View>
                        <View style={[styles.tableColSumBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.dolg || "0"} сом
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View style={[styles.table, styles.leftNonetable]}>
                    {right_dolg_end?.map((row, index) => (
                      <View style={styles.tableRow} key={`second-${index}`}>
                        <View style={[styles.tableColBC, styles.indexs]}>
                          <Text style={[styles.tableCellBC, styles.indexInner]}>
                            {row?.id}
                          </Text>
                        </View>
                        <View style={[styles.tableColBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.name || ""}
                          </Text>
                        </View>
                        <View style={[styles.tableColSumBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.sum || "0"} сом
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View style={[styles.podpisTotal]}>
                <Text style={styles.linetext}>Итого: </Text>
                <Text style={styles.linetext}>
                  {listReport?.debt_point_end_total} сом
                </Text>
              </View>

              {/* ///////////////////////// */}
              <Text style={styles.centerTitle}>
                Остатки продукции на начало смены
              </Text>
              <View style={styles.twoTable}>
                <View style={styles.twoTable}>
                  <View style={[styles.table]}>
                    {left_leftovers_end?.map((row, index) => (
                      <View style={styles.tableRow} key={`first-${index}`}>
                        <View style={[styles.tableColBC, styles.indexs]}>
                          <Text style={[styles.tableCellBC, styles.indexInner]}>
                            {row?.id}
                          </Text>
                        </View>
                        <View style={[styles.tableColBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.name || ""}
                          </Text>
                        </View>
                        <View style={[styles.tableColSumBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.dolg || "0"} сом
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View style={[styles.table, styles.leftNonetable]}>
                    {right_leftovers_end?.map((row, index) => (
                      <View style={styles.tableRow} key={`second-${index}`}>
                        <View style={[styles.tableColBC, styles.indexs]}>
                          <Text style={[styles.tableCellBC, styles.indexInner]}>
                            {row?.id}
                          </Text>
                        </View>
                        <View style={[styles.tableColBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.name || ""}
                          </Text>
                        </View>
                        <View style={[styles.tableColSumBC]}>
                          <Text style={[styles.tableCellBC]}>
                            {row?.sum || "0"} сом
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View style={[styles.podpisTotal]}>
                <Text style={styles.linetext}>Итого: </Text>
                <Text style={styles.linetext}>
                  {listReport?.list_leftovers_end_total} сом
                </Text>
              </View>

              <View style={styles.footer}>
                <View style={styles.footer_inner}>
                  <Text style={styles.linetext}>
                    Сдал: _______________________________________
                  </Text>
                  <Text style={styles.linetext}>
                    Подпись: _______________________________________
                  </Text>
                </View>
                <View style={styles.footer_inner}>
                  <Text style={styles.linetext}>
                    Принял: _______________________________________
                  </Text>
                  <Text style={styles.linetext}>
                    Подпись: _______________________________________
                  </Text>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </Modals>
    </div>
  );
};

export default GenerateReportPdf;
