import React from "react";
import { Route, Routes } from "react-router-dom";

const PagesSoputka = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesSoputka />} />
      {/* <Route path="/accept_prod" element={<AcceptInvoiceProdPage />} /> */}
    </Routes>
  );
};

export default PagesSoputka;
