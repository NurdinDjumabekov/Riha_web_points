///// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

////// helpers

///// fns

////// components

///// icons

////// styles
import "./style.scss";
import SaleProds from "../SaleProds/SaleProds";

const ViewSaleProdsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { invoice_guid, status, codeid } = location.state;

  return (
    <div className="viewSaleProds">
      <SaleProds invoice_guid={invoice_guid} status={status} codeid={codeid} />
    </div>
  );
};

export default ViewSaleProdsPage;
