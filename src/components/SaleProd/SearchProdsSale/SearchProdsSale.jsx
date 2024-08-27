////hooks
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

///// components
import { clearListProdSearch } from "../../../store/reducers/requestSlice";
import { searchProdSale } from "../../../store/reducers/requestSlice";

/////helpers
import { debounce } from "lodash";

/////fns
import { changeSearchProd } from "../../../store/reducers/stateSlice";

////imgs
import searchIcon from "../../../assets/icons/searchIcon.png";
import navBack from "../../../assets/icons/arrowNav.svg";

////style
import "./style.scss";

export const SearchProdsSale = () => {
  const refInput = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchProd } = useSelector((state) => state.stateSlice);

  const { data } = useSelector((state) => state.saveDataSlice);

  const searchData = useCallback(
    debounce((text) => {
      if (text?.length > 1) {
        const sendData = { text, seller_guid: data?.seller_guid };
        // Подготовка данных для поиска
        dispatch(searchProdSale({ ...sendData }));
        // Выполнение поиска с заданными параметрами
      }
    }, 500),
    []
  );

  const focus = () => refInput?.current?.focus();

  useEffect(() => {
    setTimeout(() => {
      focus();
    }, 500);
  }, []);

  const onChange = (e) => {
    const text = e?.target?.value;

    if (text?.[0] === " " || text?.includes("  ")) {
      return;
    }

    dispatch(changeSearchProd(text));
    searchData(text);
    text?.length === 0 ? dispatch(clearListProdSearch()) : searchData(text);
  };

  return (
    <div className="blockSearch">
      <button onClick={() => navigate(-1)} className="navBtn">
        <img src={navBack} />
      </button>
      <input
        ref={refInput}
        placeholder="Поиск товаров ..."
        onChange={onChange}
        value={searchProd}
      />
      <button onClick={focus}>
        <img src={searchIcon} />
      </button>
    </div>
  );
};
