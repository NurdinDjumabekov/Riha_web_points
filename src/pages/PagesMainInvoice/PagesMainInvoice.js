import React from "react";
import { Route, Routes } from "react-router-dom";
import AcceptInvoiceProdPage from "./AcceptInvoiceProdPage/AcceptInvoiceProdPage";
import AcceptInvoiceHistoryPage from "./AcceptInvoiceHistoryPage/AcceptInvoiceHistoryPage";
import DetailedInvoiceProdPage from "./DetailedInvoiceProdPage/DetailedInvoiceProdPage";
import EveryInvoiceAcceptPage from "./EveryInvoiceAcceptPage/EveryInvoiceAcceptPage";

const PagesMainInvoice = () => {
  return (
    <Routes>
      <Route path="/accept_prod" element={<AcceptInvoiceProdPage />} />
      <Route path="/accept_detailed" element={<DetailedInvoiceProdPage />} />
      <Route path="/accept_history" element={<AcceptInvoiceHistoryPage />} />
      <Route path="/every_accept_inv" element={<EveryInvoiceAcceptPage />} />
    </Routes>
  );
};

export default PagesMainInvoice;
