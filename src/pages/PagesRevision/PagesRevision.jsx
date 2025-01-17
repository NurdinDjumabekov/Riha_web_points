////// hooks
import React from "react";
import { Route, Routes } from "react-router-dom";

//// check
import EveryRevisionRequestPage from "./EveryRevisionRequestPage/EveryRevisionRequestPage";

///// components
import CheckTovarPage from "./CheckTovarPage/CheckTovarPage";
import RevisionRequestPage from "./RevisionRequestPage/RevisionRequestPage";
import InvoiceCheckPage from "./InvoiceCheckPage/InvoiceCheckPage";
import RevisionQRscanPage from "./RevisionQRscanPage/RevisionQRscanPage";
import AcceptRevisionPage from "./AcceptRevisionPage/AcceptRevisionPage";

const PagesRevision = () => {
  return (
    <Routes>
      <Route path="/main" element={<CheckTovarPage />} />
      <Route path="/request" element={<RevisionRequestPage />} />
      <Route path="/check" element={<InvoiceCheckPage />} />
      <Route path="/qr_scan" element={<RevisionQRscanPage />} />
      <Route path="/every_accept_inv" element={<AcceptRevisionPage />} />
      {/* <Route path="/every" element={<EveryRevisionRequestPage />} /> */}
    </Routes>
  );
};

export default PagesRevision;

// 0 - создан
// 1 - подтвердил отправляемый продавец
// 2 - подтвердил получающий продавец
// -1 - удален отменен
