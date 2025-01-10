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

const PagesRevision = () => {
  return (
    <Routes>
      <Route path="/main" element={<CheckTovarPage />} />
      {/* <Route path="/every" element={<EveryRevisionRequestPage />} /> */}
      <Route path="/check" element={<InvoiceCheckPage />} />
      <Route path="/qr_scan" element={<RevisionQRscanPage />} />
      <Route path="/request" element={<RevisionRequestPage />} />
    </Routes>
  );
};

export default PagesRevision;
