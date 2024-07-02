///hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/////components
import { SearchProdsSale } from "../../../components/SaleProd/SearchProdsSale/SearchProdsSale";
import { EveryProduct } from "../../../components/SaleProd/EveryProduct/EveryProduct";

////fns
import { clearListProdSearch } from "../../../store/reducers/requestSlice";
import { changeSearchProd } from "../../../store/reducers/stateSlice";

////style
import "./style.scss";
import NavMenu from "../../../common/NavMenu/NavMenu";

const SaleSearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listProdSearch } = useSelector((state) => state.requestSlice);

  const { infoKassa } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    return () => {
      dispatch(clearListProdSearch());
      ////// очищаю список товаров
      dispatch(changeSearchProd(""));
      ////// очищаю поиск
    };
  }, []);

  const emptyDataProd = listProdSearch?.length === 0;

  const listProdSale = () => {
    navigate("/sale/sols_prods", { state: { guidInvoice: infoKassa?.guid } });
  };

  return (
    <>
      <NavMenu>
        <SearchProdsSale />
      </NavMenu>
      <div className="containerSale">
        <div className="containerSale__inner">
          <div className="listProdSale" onClick={listProdSale}>
            <p className="textTovar">Список продаж</p>
            <div className="arrowInner"></div>
          </div>
          {emptyDataProd ? (
            <p className="noneData">Список пустой</p>
          ) : (
            <div className="blockSelectProd">
              {listProdSearch?.map((item, index) => (
                <EveryProduct
                  key={item?.guid}
                  obj={item}
                  index={index}
                  type={"sale"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SaleSearchPage;
