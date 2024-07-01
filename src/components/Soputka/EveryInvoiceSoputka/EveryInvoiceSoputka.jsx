/////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

///// fns
import { clearListProductTT } from "../../../store/reducers/requestSlice";
import { changeSearchProd } from "../../../store/reducers/stateSlice";

///// components
import { EveryProduct } from "../../SaleProd/EveryProduct/EveryProduct";
import NavMenu from "../../../common/NavMenu/NavMenu";
import SearchProdsSoputka from "../SearchProdsSoputka/SearchProdsSoputka";
import AddProductsInvoice from "../../../common/AddProductsInvoice/AddProductsInvoice";

////style
import "./style.scss";

const EveryInvoiceSoputka = ({ forAddTovar }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { listProductTT } = useSelector((state) => state.requestSlice);

  const getData = () => {
    dispatch(changeSearchProd("")); ////// очищаю поиск
    dispatch(clearListProductTT()); ////// очищаю список товаров
  };

  useEffect(() => {
    getData();
  }, []);

  const emptyDataProd = listProductTT?.length === 0;

  return (
    <>
      <NavMenu>
        <SearchProdsSoputka getData={getData} location={location} />
      </NavMenu>
      <div className="containerSoputka">
        <div className="containerSoputka__inner">
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
                  type={"soputka"}
                />
              ))}
            </div>
          )}
        </div>
        <AddProductsInvoice forAddTovar={forAddTovar} />
      </div>
    </>
  );
};

export default EveryInvoiceSoputka;
