import React from "react";
import PayMoneyPage from "./PayMoneyPage/PayMoneyPage";
import { Route, Routes } from "react-router-dom";

const PagesPay = () => {
  return (
    <Routes>
      <Route path="/main" element={<PayMoneyPage />} />
    </Routes>
  );
};

export default PagesPay;
