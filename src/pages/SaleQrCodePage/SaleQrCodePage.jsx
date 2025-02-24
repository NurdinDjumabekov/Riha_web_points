////// hooks
import React from "react";
import { Route, Routes } from "react-router-dom";

////// components
import SaleLayout from "../../LayoutsList/SaleLayout/SaleLayout";

////// components
import ViewSaleProdsPage from "../../components/SaleQrCodePage/ViewSaleProdsPage/ViewSaleProdsPage";
import SaleProdPage from "../../components/SaleQrCodePage/SaleProdPage/SaleProdPage";

const SaleQrCodePage = () => {
  return (
    <Routes>
      <Route element={<SaleLayout />}>
        <Route path="/main" element={<SaleProdPage />} />
        <Route path="/view_prods" element={<ViewSaleProdsPage />} />
      </Route>
    </Routes>
  );
};

export default SaleQrCodePage;
