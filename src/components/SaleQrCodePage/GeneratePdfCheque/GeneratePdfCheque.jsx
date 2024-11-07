///// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

////// style
import { styles } from "./style";
import "./style.scss";

////// components
import { pdf, Document, Page, Text, View, Image } from "@react-pdf/renderer";

////// helpers
import { transformDatePeriod } from "../../../helpers/transformDate";
import { roundingNum } from "../../../helpers/amounts";

////// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import logo from "../../../assets/images/rihaLogo.png";

const GeneratePdfCheque = ({ list, invoice_guid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pdfRef = useRef(null);

  const date = transformDatePeriod(new Date());

  const handlePrint = async () => {
    const doc = (
      <Document>
        <Page size={{ width: 226.77, height: 595.28 }} style={styles.page}>
          <View style={styles.section}>
            <Image src={logo} style={styles.image} />
            <Text style={styles.title}>Риха</Text>
          </View>
          <Text style={styles.header}>
            Чек № {list?.[0]?.codeid} от {date}
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCol, styles.numsTitle]}>
                <Text style={[styles.textTitle, styles.nums]}>№</Text>
              </View>
              <View style={[styles.tableCol, styles.names]}>
                <Text style={[styles.textTitle, styles.name]}>
                  Наименование
                </Text>
              </View>
              <View style={[styles.tableCol, styles.headersOther]}>
                <Text style={styles.textTitle}>Вес</Text>
              </View>
              <View style={[styles.tableCol, styles.headersOther]}>
                <Text style={styles.textTitle}>Цена</Text>
              </View>
              <View
                style={[styles.tableCol, styles.headersOther, styles.rightNone]}
              >
                <Text style={styles.textTitle}>Сумма</Text>
              </View>
            </View>

            {list?.map((i, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={[styles.tableCol, styles.numsMain]}>
                  <Text style={[styles.tableCell, styles.numsMainInner]}>
                    {index + 1}
                  </Text>
                </View>
                <View style={[styles.tableCol, styles.namesInner]}>
                  <Text style={[styles.tableCell, styles.numsInnerText]}>
                    {i?.product_name}
                  </Text>
                </View>
                <View style={[styles.tableCol, styles.headersOther]}>
                  <Text style={styles.tableCell}>
                    {roundingNum(i?.count)} {i?.unit}
                  </Text>
                </View>
                <View style={[styles.tableCol, styles.headersOther]}>
                  <Text style={styles.tableCell}>{roundingNum(i?.price)}</Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    styles.headersOther,
                    styles.rightNone,
                  ]}
                >
                  <Text style={styles.tableCell}>{i?.sale_price} сом</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <View style={styles.answer}>
              <Text style={styles.linetext}>Сумма скидки: </Text>
              <Text style={styles.linetext}>0 сом</Text>
            </View>
            <View style={[styles.answer, styles.answerLine]}>
              <Text style={styles.linetext}>Итого: </Text>
              <Text style={styles.linetext}>
                {roundingNum(list?.[0]?.total_price) || 0} сом
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);

    if (pdfRef.current) {
      pdfRef.current.src = url;
      pdfRef.current.onload = () => {
        pdfRef.current.contentWindow.print();

        // if (listProds?.length == 0) {
        //   alert("Пустой список!");
        //   setConfirm("");
        //   return;
        // }
        // const send = { invoice_guid, status: 2 };
        // //// 2 - подтверждение накладной продажи
        // const res = await dispatch(updateStatusInvoice(send)).unwrap();
        // if (!!res?.result) {
        //   navigate("/");
        // }
      };
    }
  };

  return (
    <div className="generateBlock">
      <button className="saveAction endSaleBtn" onClick={handlePrint}>
        {/* <LibraryAddIcon sx={{ width: 16, height: 16 }} /> */}
        <p>Распечатать чек</p>
      </button>
      <iframe
        ref={pdfRef}
        style={{ display: "none" }}
        title="print-pdf"
      ></iframe>
    </div>
  );
};

export default GeneratePdfCheque;
