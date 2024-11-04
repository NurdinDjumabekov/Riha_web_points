import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

const Layouts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const checkSaleQr = pathname.includes("sale_qr_code");

  return (
    <div className={`layoutBlock ${checkSaleQr ? "saleQr" : ""}`}>
      <Outlet />
    </div>
  );
};

export default Layouts;
