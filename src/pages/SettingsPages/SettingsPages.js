//////// hooks
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/////// components
import SortMyListPage from "./SortMyListPage/SortMyListPage";

const SettingsPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/list" element={<SortMyListPage />} />
    </Routes>
  );
};

export default SettingsPages;
