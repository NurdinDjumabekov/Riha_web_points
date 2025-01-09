/////// hooks
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

////// imgs
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

///// fns
import { changePreloader } from "../../../store/reducers/requestSlice";
import { clearLogin } from "../../../store/reducers/stateSlice";
import { clearLocalData } from "../../../store/reducers/saveDataSlice";

////// style
import "./style.scss";

/////// components
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(changePreloader(true));
    dispatch(clearLogin());
    dispatch(clearLocalData());
    setTimeout(() => {
      navigate("/");
      dispatch(changePreloader(false));
    }, 300);
  };

  return (
    <>
      <List sx={{ marginTop: "auto" }}>
        <ListItem
          sx={{ padding: 2, justifyContent: "center", cursor: "pointer" }}
          onClick={logOut}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={"Выход"} />
        </ListItem>
      </List>
    </>
  );
};

export default LogOut;
