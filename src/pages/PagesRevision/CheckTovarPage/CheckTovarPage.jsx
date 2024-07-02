////// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

///// fns
import { clearListSellersPoints } from "../../../store/reducers/requestSlice";
import { getHistoryRevision } from "../../../store/reducers/requestSlice";
import { getSellersEveryPoint } from "../../../store/reducers/requestSlice";
import { changeLocalData } from "../../../store/reducers/saveDataSlice";

///// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import ListProdsRevision from "../../../components/CheckProd/ListProdsRevision/ListProdsRevision";

///helpers
import { getLocalDataUser } from "../../../helpers/returnDataUser";

////style
import "./style.scss";
import { useState } from "react";
import ModalWorkShop from "../../../components/CheckProd/ModalWorkShop/ModalWorkShop";

const CheckTovarPage = () => {
  //// ревизия (отображение списка ист0рий ревизии.
  //// btns для создания ревии и просмотра запросов других продавцов)

  const [bottomSheet, setBottomSheet] = useState(false); /// выбор продавца для ревизии

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.saveDataSlice);
  const { listHistoryRevision } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getData = async () => {
    dispatch(clearListSellersPoints());
    ///// очищаю список продавцов каждой точки

    const { seller_guid } = data;
    await getLocalDataUser({ changeLocalData, dispatch });

    ////// get список продавцов определенной точки
    await dispatch(getSellersEveryPoint(seller_guid));

    ////// get историю ревизии
    await dispatch(getHistoryRevision(seller_guid));
  };

  const navLick = () => navigate("/revision/request");

  const empty = listHistoryRevision?.length === 0;

  const openBottomSheet = () => setBottomSheet(true);

  return (
    <>
      <NavMenu navText={"Ревизия"} />
      <div className="mainRevisionParent">
        <div className="actionBlock">
          <button onClick={openBottomSheet}>
            Выбрать продавца для ревизии
          </button>
          <button onClick={navLick}>Запросы других продавцов</button>
        </div>
        <h6>История вашей ревизии</h6>
        {empty && <p className="noneData">Список пустой</p>}
        <div className="mainRevisionParent__list">
          {listHistoryRevision?.map((item) => (
            <ListProdsRevision item={item} key={item.guid} disable={true} />
          ))}
        </div>
      </div>
      <ModalWorkShop
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
      />
      {/* /////для выбора цехов*/}
    </>
  );
};

export default CheckTovarPage;
