/////// icons
import logo from "../../assets/images/rihaLogo.png";
import twoArrow from "../../assets/icons/twoArrow.svg";
import arrowRight from "../../assets/icons/arrowMenu.svg";

///// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

////// style
import "./style.scss";

///// components
import { Fragment } from "react";
import { Tooltip } from "@mui/material";
import LogOut from "../../components/AllCategPage/LogOut/LogOut";

//// helpers
import { dataCategory } from "../../helpers/Data";

///// fns
import { createInvoice } from "../../store/reducers/saleSlice";

const MenuMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [active, setActive] = useState(true);

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

  return (
    <div className="menuMain">
      <div className={`menuMain__inner ${active ? "" : "activeHeader"}`}>
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
          <span>Меню</span>
        </div>
        {dataCategory?.map(({ name, icon, codeid, link }) => (
          <Fragment key={codeid}>
            {active ? (
              <div
                // className={`/${link}` == pathname ? "activeMenu" : ""}
                onClick={() => clickPage({ link, codeid })}
              >
                <button>{icon}</button>
                <p>{name}</p>
                <img src={arrowRight} alt=">" className="navArrow" />
              </div>
            ) : (
              <Tooltip
                key={codeid}
                title={<p style={{ fontSize: 15, padding: 5 }}>{name}</p>}
                placement="left"
                arrow
                onClick={() => clickPage({ link, codeid })}
              >
                <div
                  // className={pathname == link ? "activeMenu" : ""}
                  onClick={() => clickPage({ link, codeid })}
                >
                  <button>{icon}</button>
                </div>
              </Tooltip>
            )}
          </Fragment>
        ))}
        <LogOut active={active} />
      </div>
    </div>
  );
};

export default MenuMain;
