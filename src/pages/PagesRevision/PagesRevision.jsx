import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckTovarPage from "./CheckTovarPage/CheckTovarPage";
import EveryRevisionRequestPage from "./EveryRevisionRequestPage/EveryRevisionRequestPage";
import RevisionRequestPage from "./RevisionRequestPage/RevisionRequestPage";
import InvoiceCheckPage from "./InvoiceCheckPage/InvoiceCheckPage";

const PagesRevision = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesRevision />} />
      <Route path="/main" element={<CheckTovarPage />} />
      {/* <Route path="/every" element={<EveryRevisionRequestPage />} /> */}
      <Route path="/request" element={<RevisionRequestPage />} />
      <Route path="/check" element={<InvoiceCheckPage />} />
    </Routes>
  );
};

export default PagesRevision;
