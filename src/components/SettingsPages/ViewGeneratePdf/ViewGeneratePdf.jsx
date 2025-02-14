import { useRef, useState, useEffect } from "react";
import { Document, Page, Text, View, Image, pdf } from "@react-pdf/renderer";
import JsBarcode from "jsbarcode";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { saveAs } from "file-saver"; // Установи этот пакет: npm install file-saver

import { styles } from "./style";
import { myAlert } from "../../../helpers/MyAlert";

const MyDocument = ({ list }) => (
  <Document>
    {list?.map((category) => (
      <Page key={category.category_guid} style={styles.page}>
        <Text style={styles.categoryTitle}>{category.category_name}</Text>

        <View style={styles.twoColumnContainer}>
          <View style={styles.columnContainer}>
            {category?.prods
              ?.slice(0, Math.ceil(category?.prods?.length / 2))
              ?.map((product) => {
                if (!!!product.qrcode) return <NoBarCode product={product} />;

                const canvas = document.createElement("canvas");
                JsBarcode(canvas, product.qrcode || "", {
                  format: "CODE128",
                  width: 2,
                  height: 50,
                  displayValue: false,
                });
                const barcode = canvas.toDataURL("image/png"); // Генерируем новый штрих-код

                return (
                  <View key={product.guid} style={styles.row}>
                    <View style={styles.columnTitle}>
                      <Text style={styles.column}>{product.product_name}</Text>
                    </View>
                    <View style={[styles.columnTitle, styles.barcodeMain]}>
                      <Image src={barcode} style={styles.barcode} />
                    </View>
                  </View>
                );
              })}
          </View>

          <View style={styles.columnContainer}>
            {category?.prods
              ?.slice(Math.ceil(category?.prods?.length / 2))
              ?.map((product) => {
                if (!!!product.qrcode) return <NoBarCode />;
                const canvas = document.createElement("canvas");
                JsBarcode(canvas, product.qrcode || "", {
                  format: "CODE128",
                  width: 2,
                  height: 50,
                  displayValue: false,
                });
                const barcode = canvas.toDataURL("image/png"); // Генерируем новый штрих-код

                return (
                  <View key={product.guid} style={styles.row}>
                    <View style={styles.columnTitle}>
                      <Text style={styles.column}>{product.product_name}</Text>
                    </View>
                    <View style={[styles.columnTitle, styles.barcodeMain]}>
                      <Image src={barcode} style={styles.barcode} />
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </Page>
    ))}
  </Document>
);

const NoBarCode = ({ product }) => {
  return (
    <View key={product.guid} style={styles.row}>
      <View style={styles.columnTitle}>
        <Text style={styles.column}>{product.product_name}</Text>
      </View>
      <View style={[styles.columnTitle, styles.barcodeMain]}></View>
    </View>
  );
};

const ViewGeneratePdf = ({ list }) => {
  const iframeRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState("");

  console.log(list, "list");

  const handlePrint = async () => {
    const err = "Отметьте галочками товары, которые хотите распечатать";
    if (list?.length == 0) return myAlert(err, "error");
    const blob = await pdf(<MyDocument list={list} />).toBlob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.contentWindow.print();
      }
    }, 500);
  };

  const handleDownload = async () => {
    const err = "Отметьте галочками товары, которые хотите распечатать";
    if (list?.length == 0) return myAlert(err, "error");
    const blob = await pdf(<MyDocument list={list} />).toBlob();
    saveAs(blob, "Товары Рихи.pdf");
  };

  return (
    <>
      <button onClick={handlePrint} style={{ background: "#1976d2" }}>
        <FileCopyIcon sx={{ color: "#fff", width: 16, height: 16 }} />
        <span>Распечатать</span>
      </button>

      <button onClick={handleDownload} style={{ background: "#4caf50" }}>
        <FileCopyIcon sx={{ color: "#fff", width: 16, height: 16 }} />
        <span>Скачать файл</span>
      </button>

      {pdfUrl && (
        <iframe
          ref={iframeRef}
          src={pdfUrl}
          style={{ display: "none" }}
          title="print-pdf"
        />
      )}
    </>
  );
};

export default ViewGeneratePdf;
