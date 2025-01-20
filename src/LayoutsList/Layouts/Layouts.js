/////// hooks
import { Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

///// components
import MenuMain from "../MenuMain/MenuMain";
import UserInfo from "../../components/Header/UserInfo/UserInfo";
import Preloader from "../../common/Preloader/Preloader";

const Layouts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  return (
    <div className={`layoutBlock`}>
      <MenuMain />
      <div className="mainNavLayout">
        <header>
          <UserInfo />
        </header>
      </div>
      <div className="everyPage">
        <Outlet />
      </div>
    </div>
  );
};

export default Layouts;
