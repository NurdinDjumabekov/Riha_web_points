import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage/LoginPage";
import Layouts from "../Layouts/Layouts";
import AllCategPage from "../pages/AllCategPage/AllCategPage";
import PagesMainInvoice from "../pages/PagesMainInvoice/PagesMainInvoice";
import PagesSoputka from "../pages/PagesSoputka/PagesSoputka";
import LeftoversPage from "../pages/LeftoversPage/LeftoversScreen";
import PagesSale from "../pages/PagesSale/PagesSale";
import StoreSpendingPage from "../pages/SpendingPage/StoreSpendingPage";
import PayMoneyPage from "../pages/PayPage/PayMoneyPage/PayMoneyPage";
import PagesReturn from "../pages/PagesReturn/PagesReturn";
import PagesRevision from "../pages/PagesRevision/PagesRevision";
import Preloader from "../common/Preloader/Preloader";
// import Alerts from "../components/Alerts/Alerts";
// import MoreInfo from "../components/MoreInfo/MoreInfo";

const MainRoutes = () => {
  const { preloader } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  return (
    <>
      <Routes>
        {!data?.seller_guid ? (
          <Route path="/" element={<LoginPage />} />
        ) : (
          <Route element={<Layouts />}>
            <Route path="/categs" element={<AllCategPage />} />
            <Route path="/main_invoice/*" element={<PagesMainInvoice />} />
            <Route path="/soputka/*" element={<PagesSoputka />} />
            <Route path="/leftovers" element={<LeftoversPage />} />
            <Route path="/sale/*" element={<PagesSale />} />
            <Route path="/spending" element={<StoreSpendingPage />} />
            <Route path="/pay" element={<PayMoneyPage />} />
            <Route path="/return/*" element={<PagesReturn />} />
            <Route path="/revision/*" element={<PagesRevision />} />
          </Route>
        )}
      </Routes>

      {preloader && <Preloader />}
    </>
  );
};

export default MainRoutes;
