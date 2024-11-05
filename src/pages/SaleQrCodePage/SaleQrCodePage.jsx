import React from "react";
import { Route, Routes } from "react-router-dom";
import SaleLayout from "../../LayoutsList/SaleLayout/SaleLayout";
import HistoryInvoicePage from "../../components/SaleQrCodePage/HistoryInvoicePage/HistoryInvoicePage";
import ViewSaleProdsPage from "../../components/SaleQrCodePage/ViewSaleProdsPage/ViewSaleProdsPage";
import SaleProdPage from "../../components/SaleQrCodePage/SaleProdPage/SaleProdPage";
import SearchProdPage from "../../components/SaleQrCodePage/SearchProdPage/SearchProdPage";

const SaleQrCodePage = () => {
  return (
    <Routes>
      <Route element={<SaleLayout />}>
        {/* <Route path="/" element={<SaleQrCodePage />} /> */}
        <Route path="/main" element={<SaleProdPage />} />
        <Route path="/search" element={<SearchProdPage />} />
        <Route path="/return_prod" element={<HistoryInvoicePage />} />
        <Route path="/view_prods" element={<ViewSaleProdsPage />} />
      </Route>
    </Routes>
  );
};

export default SaleQrCodePage;

// @media screen and (max-width: 370px) {
//   width: 340px;
// }
