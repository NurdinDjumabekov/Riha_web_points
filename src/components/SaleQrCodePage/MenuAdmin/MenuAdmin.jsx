import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";

/////// icons
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AvTimerOutlinedIcon from "@mui/icons-material/AvTimerOutlined";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";

import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import RestartAltIcon from "@mui/icons-material/EditCalendar";
import AssignmentIcon from "@mui/icons-material/Assignment";

///// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

////// style
import "./style.scss";

///// components
import { Tooltip } from "@mui/material";

////// helpers

////// fns

///// icons
import logo from "../../../assets/images/rihaLogo.png";
import twoArrow from "../../../assets/icons/twoArrow.svg";
import arrowRight from "../../../assets/icons/arrowMenu.svg";
import { Fragment } from "react";

const MenuAdmin = ({ invoice_guid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [active, setActive] = useState(true);

  const clickPage = (link) => {
    navigate(`/`);
    navigate(`/sale_qr_code${link}`, { state: { invoice_guid } });
  };

  const listMenu = [
    {
      id: 1,
      title: "Список товаров",
      icon: <ChecklistRtlIcon sx={{ color: "#fff" }} />,
      link: "/main",
    },
    {
      id: 2,
      title: "Поиск товара",
      icon: <AssignmentIcon sx={{ color: "#fff" }} />,
      link: "/search",
    },
    {
      id: 3,
      title: "История продаж",
      icon: <RestartAltIcon sx={{ color: "#fff" }} />,
      link: "/history_sale",
    },
  ];

  return (
    <div className="actionSettings">
      <div className={`actionSettings__inner ${active ? "" : "activeHeader"}`}>
        <h1 className={active ? "" : "activeLogo"}>
          <img src={logo} alt="logo" />
          <button onClick={() => setActive(!active)}>
            {active ? (
              <img src={twoArrow} alt="<<" />
            ) : (
              <img src={twoArrow} alt="<<" className="rotate" />
            )}
          </button>
        </h1>
        <div className={`menuBlocks ${active ? "" : "menuBlocksActive"}`}>
          <span>Меню продаж</span>
        </div>
        {listMenu?.map(({ title, icon, id, link }) => (
          <Fragment>
            {active ? (
              <div
                className={pathname?.includes(link) ? "activeMenu" : ""}
                onClick={() => clickPage(link)}
              >
                <button>{icon}</button>
                <p>{title}</p>
                <img src={arrowRight} alt=">" className="navArrow" />
              </div>
            ) : (
              <Tooltip
                key={id}
                title={<p style={{ fontSize: 15, padding: 5 }}>{title}</p>}
                placement="left"
                arrow
                onClick={() => clickPage(link)}
              >
                <div
                  className={pathname == link ? "activeMenu" : ""}
                  onClick={() => clickPage(link)}
                >
                  <button>{icon}</button>
                </div>
              </Tooltip>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MenuAdmin;
