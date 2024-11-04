import React from "react";
import MenuAdmin from "../../components/SaleQrCodePage/MenuAdmin/MenuAdmin";

////// style
import "./style.scss";
import { Outlet, useLocation } from "react-router-dom";

const SaleLayout = () => {
  const location = useLocation();

  const { invoice_guid } = location.state;

  return (
    <div className="saleLayout">
      <MenuAdmin invoice_guid={invoice_guid} />
      <Outlet />
    </div>
  );
};

export default SaleLayout;
