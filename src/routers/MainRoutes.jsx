////// hooks
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

////// pages
import LoginPage from "../pages/LoginPage/LoginPage";
import Layouts from "../LayoutsList/Layouts/Layouts";

import AllCategPage from "../pages/AllCategPage/AllCategPage";
import PagesMainInvoice from "../pages/PagesMainInvoice/PagesMainInvoice";
import PagesSoputka from "../pages/PagesSoputka/PagesSoputka";
import LeftoversPage from "../pages/LeftoversPage/LeftoversScreen";
import StoreSpendingPage from "../pages/SpendingPage/StoreSpendingPage";
import PagesPay from "../pages/PayPage/PagesPay";
import PagesReturn from "../pages/PagesReturn/PagesReturn";
import PagesRevision from "../pages/PagesRevision/PagesRevision";
import SaleQrCodePage from "../pages/SaleQrCodePage/SaleQrCodePage";

////// components
import HistoryInvoicePage from "../components/SaleQrCodePage/HistoryInvoicePage/HistoryInvoicePage";
import Preloader from "../common/Preloader/Preloader";
import ReportPage from "../pages/ReportPage/ReportPage";
import SettingsPages from "../pages/SettingsPages/SettingsPages";

const MainRoutes = () => {
  const { data } = useSelector((state) => state.saveDataSlice);
  console.log(data, "data");

  return (
    <>
      <Routes>
        {!!!data?.seller_guid ? (
          <Route path="/" element={<LoginPage />} />
        ) : (
          <Route element={<Layouts />}>
            <Route path="/" element={<AllCategPage />} />
            <Route path="/main_invoice/*" element={<PagesMainInvoice />} />
            <Route path="/soputka/*" element={<PagesSoputka />} />
            <Route path="/leftovers" element={<LeftoversPage />} />
            <Route path="/sale_qr_code/*" element={<SaleQrCodePage />} />
            <Route path="/history_sale" element={<HistoryInvoicePage />} />
            <Route path="/reports" element={<ReportPage />} />
            <Route path="/spending" element={<StoreSpendingPage />} />
            <Route path="/pay/*" element={<PagesPay />} />
            <Route path="/return/*" element={<PagesReturn />} />
            <Route path="/revision/*" element={<PagesRevision />} />
            <Route path="/setting/*" element={<SettingsPages />} />
          </Route>
        )}
      </Routes>
      <Preloader />
    </>
  );
};

export default MainRoutes;

const keyName = {
  count: "count",
  price: "price",
  total_price: "total_workshop",
  total_price_invoice: "total_price",
};
