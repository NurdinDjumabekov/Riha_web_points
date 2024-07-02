////hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/// components
import ActionsEveryInvoice from "../../../common/ActionsEveryInvoice/ActionsEveryInvoice";
import NavMenu from "../../../common/NavMenu/NavMenu";
import { EveryProduct } from "../EveryProduct/EveryProduct";

/////fns
import { getWorkShopsGorSale } from "../../../store/reducers/requestSlice";
import { changeSearchProd } from "../../../store/reducers/stateSlice";
import SaleMenu from "../../../common/SaleMenu/SaleMenu";

////style
import "./style.scss";

export const EveryInvoiceSale = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { listProductTT } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const getData = () => {
    const sendData = { seller_guid: data?.seller_guid, type: "sale" };
    // ////// внутри есть getCategoryTT и getProductTT
    dispatch(getWorkShopsGorSale({ ...sendData, location }));

    dispatch(changeSearchProd(""));
    ////// очищаю поиск
  };

  useEffect(() => {
    getData();
  }, []);

  const emptyDataProd = listProductTT?.length === 0;

  return (
    <>
      <NavMenu navText={"Продажи"} />
      <div className="containerSale">
        <div className="containerSale__inner">
          <ActionsEveryInvoice location={location} type={"sale"} />
          <p className="textTovar">Список товаров</p>
          {emptyDataProd ? (
            <p className="noneData">Список пустой</p>
          ) : (
            <div className="blockSelectProd">
              {listProductTT?.map((item, index) => (
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
        <SaleMenu />
      </div>
    </>
  );
};
