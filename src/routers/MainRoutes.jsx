import React from "react";
import { Route, Routes } from "react-router-dom";
// import { Preloader } from "../components/Preloader/Preloader";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage/LoginPage";
import Layouts from "../Layouts/Layouts";
import AllCategPage from "../pages/AllCategPage/AllCategPage";
import PagesMainInvoice from "../pages/PagesMainInvoice/PagesMainInvoice";
import PagesSoputka from "../pages/PagesSoputka/PagesSoputka";
import LeftoversPage from "../pages/LeftoversPage/LeftoversScreen";
// import Alerts from "../components/Alerts/Alerts";
// import MoreInfo from "../components/MoreInfo/MoreInfo";

const MainRoutes = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<Layouts />}>
        <Route path="/categs" element={<AllCategPage />} />
        <Route path="/main_invoice/*" element={<PagesMainInvoice />} />
        <Route path="/soputka/*" element={<PagesSoputka />} />
        <Route path="/leftovers" element={<LeftoversPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
