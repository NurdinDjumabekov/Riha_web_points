import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";
import NavMenu from "../common/NavMenu/NavMenu";

const Layouts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // console.log(location?.pathname, "location");

  return (
    <div className="layoutBlock">
      {/* <NavMenu /> */}
      <Outlet />
    </div>
  );
};

export default Layouts;
