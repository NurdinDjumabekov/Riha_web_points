import React from "react";
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
=======
import SoputkaMainPage from "./SoputkaMainPage/SoputkaMainPage";
import AddProdSoputkaPage from "./AddProdSoputkaPage/AddProdSoputkaPage";
import SoputkaProductPage from "./SoputkaProductPage/SoputkaProductPage";
import SoputkaProdHistoryPage from "./SoputkaProdHistoryPage/SoputkaProdHistoryPage";
>>>>>>> 1e0db50e4d822d874220c502d645d295ca18b997

const PagesSoputka = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesSoputka />} />
<<<<<<< HEAD
      {/* <Route path="/accept_prod" element={<AcceptInvoiceProdPage />} /> */}
=======
      <Route path="/main" element={<SoputkaMainPage />} />
      <Route path="/add" element={<AddProdSoputkaPage />} />
      <Route path="/prods" element={<SoputkaProductPage />} />
      <Route path="/history" element={<SoputkaProdHistoryPage />} />
>>>>>>> 1e0db50e4d822d874220c502d645d295ca18b997
    </Routes>
  );
};

export default PagesSoputka;
