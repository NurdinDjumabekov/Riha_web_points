/////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { clearLeftovers } from "../../store/reducers/requestSlice";
import { clearListCategory } from "../../store/reducers/requestSlice";
import { clearListProductTT } from "../../store/reducers/requestSlice";
import { getWorkShopsGorSale } from "../../store/reducers/requestSlice";
import { changeLocalData } from "../../store/reducers/saveDataSlice";
import { changeActiveSelectCategory } from "../../store/reducers/stateSlice";
import { changeActiveSelectWorkShop } from "../../store/reducers/stateSlice";

/////// helpers
import { getLocalDataUser } from "../../helpers/returnDataUser";

/////// components
import ActionsEveryInvoice from "../../common/ActionsEveryInvoice/ActionsEveryInvoice";
import NavMenu from "../../common/NavMenu/NavMenu";
import TablesLeftovers from "../../components/Tables/TablesLeftovers/TablesLeftovers";

/////// style
import "./style.scss";

const LeftoversPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.saveDataSlice);

  const { listLeftovers } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      dispatch(clearLeftovers([]));
      dispatch(clearListProductTT());
      dispatch(clearListCategory());
      ///// очищаю список категрий и продуктов
      dispatch(changeActiveSelectCategory(""));
      /// очищаю категории, для сортировки товаров по категориям
      dispatch(changeActiveSelectWorkShop(""));
      /// очищаю цеха, для сортировки товаров по категориям
    };
  }, []);

  const getData = async () => {
    await getLocalDataUser({ changeLocalData, dispatch });
    dispatch(clearLeftovers()); //// очищаю массив данныз остатков

    const { seller_guid } = data;

    const sendData = { seller_guid, type: "leftovers" };

    const obj = { location: { pathname: "leftovers" } };
    // ////// внутри есть getCategoryTT и getProductTT
    dispatch(getWorkShopsGorSale({ ...sendData, ...obj }));
  };

  return (
    <>
      <NavMenu navText={"Остатки"} />
      <div className="leftoversContainer">
        <ActionsEveryInvoice
          type={"leftovers"}
          location={{ pathname: "leftovers" }}
        />
        {listLeftovers?.length === 0 ? (
          <p className="noneData">Остатков нет...</p>
        ) : (
          <TablesLeftovers arr={listLeftovers} />
        )}
      </div>
    </>
  );
};

export default LeftoversPage;
