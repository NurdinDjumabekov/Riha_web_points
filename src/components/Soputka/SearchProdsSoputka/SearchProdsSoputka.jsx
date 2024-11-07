import React, { useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";

////// redux
import { useDispatch, useSelector } from "react-redux";
import { changeSearchProd } from "../../../store/reducers/stateSlice";
import { changeLocalData } from "../../../store/reducers/saveDataSlice";
import { searchProdTT } from "../../../store/reducers/requestSlice";

///// helpers
import { getLocalDataUser } from "../../../helpers/returnDataUser";

///// imgs
import searchIcon from "../../../assets/icons/searchIcon.png";
import arrowNav from "../../../assets/icons/arrowNav.svg";

////style
import "./style.scss";
import { useNavigate } from "react-router-dom";

const SearchProdsSoputka = ({ getData, location }) => {
  const refInput = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchProd } = useSelector((state) => state.stateSlice);

  const { data } = useSelector((state) => state.saveDataSlice);

  const searchData = useCallback(
    debounce((text) => {
      if (text?.length > 1) {
        const sendData = { searchProd: text, seller_guid: data?.seller_guid };
        dispatch(searchProdTT({ ...sendData, location, type: 1 }));
        // Выполнение поиска с заданными параметрами (type: 1 поиск по сопутке!)
      }
    }, 800),
    [data]
  );

  const onChange = (e) => {
    const text = e.target.value;
    dispatch(changeSearchProd(text));
    text?.length === 0 ? getData() : searchData(text);
  };

  useEffect(() => {
    setTimeout(() => refInput?.current?.focus(), 400);
  }, []);

  return (
    <div className="blockSearchSoputka">
      <button onClick={() => navigate(-1)} className="navLine">
        <img src={arrowNav} alt="o" />
      </button>
      <input
        placeholder="Поиск товаров ..."
        onChange={onChange}
        value={searchProd}
        ref={refInput}
      />
      <button onClick={() => refInput?.current?.focus()}>
        <img src={searchIcon} alt="o" />
      </button>
    </div>
  );
};

export default SearchProdsSoputka;
