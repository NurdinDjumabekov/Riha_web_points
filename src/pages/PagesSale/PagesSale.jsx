import React from "react";
import { Route, Routes } from "react-router-dom";
import SalePointPage from "./SalePointPage/SalePointPage";
import EverySaleProdScreen from "./EverySaleProdPage/EverySaleProdPage";
import SoldProductPage from "./SoldProductPage/SoldProductPage";
import ScannerSalePage from "./ScannerSalePage/ScannerSalePage";
import SaleSearchPage from "./SaleSearchPage/SaleSearchPage";

const PagesSale = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesSale />} />
      <Route path="/main" element={<SalePointPage />} />
      <Route path="/every_prod" element={<EverySaleProdScreen />} />
      <Route path="/sols_prods" element={<SoldProductPage />} />
      <Route path="/search" element={<SaleSearchPage />} />
      <Route path="/scanner" element={<ScannerSalePage />} />
    </Routes>
  );
};

export default PagesSale;

// @media screen and (max-width: 370px) {
//   width: 340px;
// }
