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
    paddingVertical: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: 16,
  },

  header: { fontSize: 10, marginBottom: 7 },

  twoTable: { display: "flex", flexDirection: "row", marginBottom: 10 },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },

  tableRow: { flexDirection: "row", borderTop: "none" },

  tableColBC: {
    width: "55%",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    height: 16,
  },

  indexs: {
    width: "10%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
  },

  tableCellBC: {
    fontSize: 7,
    paddingVertical: 3,
    paddingHorizontal: 5,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  indexInner: { textAlign: "center" },

  leftNonetable: { borderLeft: 0 },

  tableColSumBC: {
    width: "35%",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  centerTitle: {
    fontSize: 11,
    textAlign: "center",
    // marginTop: 10,
    marginBottom: 10,
  },

  podpisTotal: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 20,
    marginTop: -10,
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 20,
  },

  linetext: { fontSize: 10 },

  textTitle: {
    fontSize: 8,
    paddingVertical: 5,
    fontWeight: "400",
    color: "#222",
    paddingHorizontal: 3,
  },

  tableCell: {
    fontSize: 7,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },

  tableCol: {
    width: "15%",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footer_inner: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});
