///// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

////// style
import "./style.scss";

///// components
import LogOut from "../../components/AllCategPage/LogOut/LogOut";
import { Drawer, List, Collapse } from "@mui/material";
import { ListItem, ListItemIcon } from "@mui/material";
import { ListItemText, Typography } from "@mui/material";

//// helpers
import { dataCategory } from "../../helpers/Data";

/////// icons
import logo from "../../assets/images/rihaLogo.png";

///// fns
import { createInvoice } from "../../store/reducers/saleSlice";

const MenuMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data } = useSelector((state) => state.saveDataSlice);

  const clickPage = async ({ link, codeid }) => {
    if (codeid == 5) {
      /// Продажа с чеком
      navigate("/");
      const res = await dispatch(createInvoice(data)).unwrap();
      if (res?.guid) {
        navigate(`/${link}`, {
          state: { invoice_guid: res?.guid, type: 1 },
        });
      }
    } else {
      navigate(`/${link}`);
    }
  };

  function checkPage({ link }) {
    const firstWord = link?.includes("/") ? link?.split("/")[0] : link;
    const currentPath = pathname?.split("/")[1]; // Первый сегмент текущего пути
    return firstWord == currentPath;
  }

  return (
    <div className="menuMain">
      <div className="menuMain__inner">
        <div className="list">
          <Drawer
            variant="permanent"
            anchor="left"
            PaperProps={{ sx: { width: 220, flexShrink: 0, zIndex: 50 } }}
          >
            <List>
              <ListItem sx={{ pl: 2, pb: 0 }}>
                <NavLink to={"/"} className="logo">
                  <img src={logo} alt="logo" />
                </NavLink>
              </ListItem>
              <ListItem sx={{ pl: 2, pb: 0 }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: "11px", fontWeight: 600 }}
                >
                  Меню
                </Typography>
              </ListItem>
              {dataCategory?.map((menuItem, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    button
                    onClick={() => clickPage(menuItem)}
                    selected={checkPage(menuItem)}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {menuItem?.icon}
                    </ListItemIcon>
                    <ListItemText primary={menuItem.name} />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
            <LogOut />
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default MenuMain;
