import React from "react";
import PayMoneyPage from "./PayMoneyPage/PayMoneyPage";
import { Route, Routes } from "react-router-dom";
import HistoryBalance from "./HistoryBalance/HistoryBalance";

const PagesPay = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesPay />} />
      <Route path="/main" element={<PayMoneyPage />} />
      <Route path="/history" element={<HistoryBalance />} />
    </Routes>
  );
};

export default PagesPay;
