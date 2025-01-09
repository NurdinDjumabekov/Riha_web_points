/////// hooks
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

////// imgs
import LogoutIcon from "@mui/icons-material/Logout";

///// fns
import { changePreloader } from "../../../store/reducers/requestSlice";
import { clearLogin } from "../../../store/reducers/stateSlice";
import {
  activePageFN,
  clearLocalData,
} from "../../../store/reducers/saveDataSlice";

////// style
import "./style.scss";

/////// components
import { Tooltip } from "@mui/material";

const LogOut = ({ active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(changePreloader(true));
    dispatch(clearLogin());
    dispatch(clearLocalData());
    dispatch(activePageFN(1));
    setTimeout(() => {
      navigate("/");
      dispatch(changePreloader(false));
    }, 300);
  };

  if (active) {
    return (
      <button onClick={logOut} className="logOutDecs">
        <LogoutIcon sx={{ color: "#506690" }} />
        {active && <p>Выйти</p>}
      </button>
    );
  }

  return (
    <Tooltip title={"Выйти"} placement="left">
      <button onClick={logOut} className="logOutDecs">
        <LogoutIcon sx={{ color: "#506690" }} />
        {active && <p>Выйти</p>}
      </button>
    </Tooltip>
  );
};

export default LogOut;
