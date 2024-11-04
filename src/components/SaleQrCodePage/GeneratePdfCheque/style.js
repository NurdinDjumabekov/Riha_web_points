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
    height: "100%",
  },

  section: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    alignItems: "center",
    gap: 10,
  },

  image: {
    width: 90,
    height: 25,
  },

  header: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 17,
    fontWeight: "400",
  },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    width: "100%",
  },

  tableRow: { flexDirection: "row", borderTop: "none" },

  tableCol: {
    width: "8%",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  rightNone: {
    borderRightWidth: 0,
  },

  numsTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  nums: { textAlign: "center" },

  names: {
    width: "39%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  name: {
    textAlign: "left",
  },

  headersOther: {
    width: "18%",
    fontSize: 10,
    textAlign: "center",
    paddingHorizontal: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  numsMain: {
    paddingHorizontal: 2,
  },

  numsMainInner: {
    textAlign: "center",
  },

  textTitle: {
    fontSize: 8,
    paddingVertical: 5,
    paddingHorizontal: 1,
    fontWeight: "400",
    color: "#222",
  },

  numsInner: { textAlign: "right" },

  numsInnerText: {
    textAlign: "left",
    paddingVertical: 3,
    paddingHorizontal: 5,
  },

  namesInner: { width: "39%", textAlign: "right" },

  tableCell: {
    fontSize: 7,
    paddingVertical: 3,
    paddingHorizontal: 1,
    textAlign: "right",
  },

  ////////////////// footer

  footer: { marginTop: 20, width: "100%" },

  answer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // justifyContent: "flex-end",

    alignItems: "center",
    gap: 10,
    width: "100%",
  },

  linetext: {
    fontSize: 10,
    fontWeight: "400",
    color: "#222",
  },

  answerLine: {
    width: "100%",
    borderBottomColor: "#222",
    borderBottomWidth: 1,
    marginTop: 10,
  },

  acceptTextMore: { marginTop: 15 },
});
