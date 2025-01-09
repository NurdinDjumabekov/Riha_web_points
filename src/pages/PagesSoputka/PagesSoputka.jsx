import React from "react";
import { Route, Routes } from "react-router-dom";
import SoputkaMainPage from "./SoputkaMainPage/SoputkaMainPage";
import AddProdSoputkaPage from "./AddProdSoputkaPage/AddProdSoputkaPage";
import SoputkaProductPage from "./SoputkaProductPage/SoputkaProductPage";
import SoputkaProdHistoryPage from "./SoputkaProdHistoryPage/SoputkaProdHistoryPage";
import SoputkaQRscanPage from "./SoputkaQRscanPage/SoputkaQRscanPage";

const PagesSoputka = () => {
  return (
    <Routes>
      <Route path="/main" element={<SoputkaMainPage />} />
      <Route path="/add" element={<AddProdSoputkaPage />} />
      <Route path="/qr_scan" element={<SoputkaQRscanPage />} />
      {/* <Route path="/prods" element={<SoputkaProductPage />} /> */}
      <Route path="/history" element={<SoputkaProdHistoryPage />} />
    </Routes>
  );
};

export default PagesSoputka;
