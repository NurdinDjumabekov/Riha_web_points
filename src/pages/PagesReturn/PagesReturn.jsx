import React from "react";
import { Route, Routes } from "react-router-dom";
import MyReturnsPage from "./MyReturnsPage/MyReturnsPage";
import DetailedReturnPage from "./DetailedReturnPage/DetailedReturnPage";
import EveryReturnPage from "./EveryReturnPage/EveryReturnPage";
import AcceptReturnHistoryPage from "./AcceptReturnHistoryPage/AcceptReturnHistoryPage";

const PagesReturn = () => {
  return (
    <Routes>
      <Route path="/" element={<PagesReturn />} />
      <Route path="/main" element={<MyReturnsPage />} />
      <Route path="/detailed" element={<DetailedReturnPage />} />
      <Route path="/every" element={<EveryReturnPage />} />
      <Route path="/accept" element={<AcceptReturnHistoryPage />} />
    </Routes>
  );
};

export default PagesReturn;
