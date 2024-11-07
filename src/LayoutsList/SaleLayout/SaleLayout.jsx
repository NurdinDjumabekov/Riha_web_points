import React from "react";
import MenuAdmin from "../../components/SaleQrCodePage/MenuAdmin/MenuAdmin";

////// style
import "./style.scss";
import { Outlet, useLocation } from "react-router-dom";

const SaleLayout = () => {
  const location = useLocation();

  return (
    <div className="saleLayout">
      <Outlet />
    </div>
  );
};

export default SaleLayout;
