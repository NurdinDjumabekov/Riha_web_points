///// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
////// components

////// styles
import "./style.scss";
import SaleProds from "../SaleProds/SaleProds";
const SaleProdPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { invoice_guid, codeid } = location.state;

  return (
    <>
      <SaleProds invoice_guid={invoice_guid} status={0} codeid={codeid} />
    </>
  );
};

export default SaleProdPage;
