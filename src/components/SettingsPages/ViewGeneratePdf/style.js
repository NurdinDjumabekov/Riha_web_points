import { StyleSheet, Font } from "@react-pdf/renderer";

import Regular from "../../../assets/fonts/Montserrat/Montserrat-Regular.ttf";
import BlackItalic from "../../../assets/fonts/Montserrat/Montserrat-BlackItalic.ttf";
import BoldItalic from "../../../assets/fonts/Montserrat/Montserrat-BoldItalic.ttf";
import ExtraBold from "../../../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf";
import ExtraLight from "../../../assets/fonts/Montserrat/Montserrat-ExtraLight.ttf";
import Italic from "../../../assets/fonts/Montserrat/Montserrat-Italic.ttf";
import Light from "../../../assets/fonts/Montserrat/Montserrat-Light.ttf";
import Medium from "../../../assets/fonts/Montserrat/Montserrat-Medium.ttf";
import SemiBold from "../../../assets/fonts/Montserrat/Montserrat-SemiBold.ttf";
import Thin from "../../../assets/fonts/Montserrat/Montserrat-Thin.ttf";

Font.register({
  family: "Montserrat",
  fonts: [
    { src: Regular, fontWeight: "400" },
    { src: BlackItalic, fontWeight: "900", fontStyle: "italic" },
    { src: BoldItalic, fontWeight: "700", fontStyle: "italic" },
    { src: ExtraBold, fontWeight: "800" },
    { src: ExtraLight, fontWeight: "200" },
    { src: Italic, fontWeight: "400", fontStyle: "italic" },
    { src: Light, fontWeight: "300" },
    { src: Medium, fontWeight: "500" },
    { src: SemiBold, fontWeight: "600" },
    { src: Thin, fontWeight: "100" },
  ],
});

export const styles = StyleSheet.create({
  page: {
    padding: 10,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: 16,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  categoryContainer: {
    marginBottom: 10,
    paddingBottom: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
    color: "#000",
  },

  twoColumnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  columnContainer: {
    width: "50%",
  },

  row: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingBottom: 5,
    marginBottom: 5,
    gap: 5,
    alignItems: "stretch",
  },

  columnHeader: {
    fontSize: 12,
    fontWeight: "bold",
    flex: 1, // Распределяет ширину равномерно
    textAlign: "center",
  },

  columnTitle: {
    height: 44,
    minHeight: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },

  column: {
    fontSize: 12,
    textAlign: "left",
    wordWrap: "break-word", // Перенос длинных значений
    width: "100%",
  },

  barcodeMain: {
    border: "1px solid #000",
    padding: 1,
    borderRadius: 3,
  },

  borcode: {
    width: 170,
    height: 38,
    backgroundColor: "green",
    borderRadius: 3,
  },
});
