//// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

//// redux
import { confirmSoputka } from "../../../store/reducers/requestSlice";
import { deleteSoputkaProd } from "../../../store/reducers/requestSlice";
import { getListSoputkaProd } from "../../../store/reducers/requestSlice";

//// helpers
import { formatCount, sumSoputkaProds } from "../../../helpers/amounts";

/////components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import ResultCounts from "../../../common/ResultCounts/ResultCounts";
import NavMenu from "../../../common/NavMenu/NavMenu";

//// style
import "./style.scss";
import Krest from "../../../common/Krest/Krest";

const SoputkaProdHistoryPage = () => {
  //// история каждой накладной сапутки
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { guidInvoice } = location.state;

  const [modalItemGuid, setModalItemGuid] = useState(null); // Состояние для идентификатора элемента, для которого открывается модальное окно

  const [confirm, setConfirm] = useState(false); // Состояние для идентификатора элемента, для которого открывается модальное окно

  const { listProdSoputka } = useSelector((state) => state.requestSlice);

  const getData = () => dispatch(getListSoputkaProd(guidInvoice));

  useEffect(() => {
    getData();
  }, []);

  const confirmBtn = () => {
    dispatch(confirmSoputka({ invoice_guid: guidInvoice, navigate }));
    /// подтверждение накладной сопутки
  };

  const addProd = () => {
    const forAddTovar = { invoice_guid: guidInvoice };
    navigate("/soputka/add", { state: { forAddTovar } });
    /// д0бавление товара в накладную сопутки
  };

  const del = (product_guid) => {
    dispatch(deleteSoputkaProd({ product_guid, getData }));
    setModalItemGuid(null);
    /// удаление товара в накладную сопутки
  };

  const status = listProdSoputka?.[0]?.status === 0; /// 0 - не подтверждён

  const listData = listProdSoputka?.[0]?.list;

  return (
    <>
      <NavMenu navText={listProdSoputka?.[0]?.date} />
      <div className="soputkaHistoryParent">
        <div
          className={`soputkaHistoryParent__inner ${!status && "moreSoputka"}`}
        >
          {listData?.map((item, index) => (
            <div key={item?.guid}>
              <div className="soputkaHistoryParent__inner__every">
                <div className="mainData">
                  <div className="mainData__inner">
                    <p className="indexNums">{index + 1}</p>
                    <p className="sumNums">
                      {item?.sale_price} сом х {item?.count} {item?.unit} ={" "}
                      {formatCount(item?.total_soputka)} сом
                    </p>
                  </div>
                  {status && (
                    <Krest onClick={() => setModalItemGuid(item?.guid)} />
                  )}
                </div>
                <p className="nameProd">{item?.product_name}</p>
              </div>
              <ConfirmationModal
                visible={modalItemGuid == item?.guid}
                message="Отменить добавление ?"
                onYes={() => del(item?.guid)}
                onNo={() => setModalItemGuid(null)}
                onClose={() => setModalItemGuid(null)}
              />
            </div>
          ))}
        </div>
        <ResultCounts list={listData} />
        <p className="soputkaHistoryParent__total">
          Сумма: {sumSoputkaProds(listProdSoputka?.[0]?.list)} сом
        </p>
        {status && (
          <div className="soputkaHistoryParent__actions">
            <button onClick={() => setConfirm(true)}>Подтвердить</button>
            <button onClick={addProd}>Добавить товар</button>
          </div>
        )}
      </div>
      <ConfirmationModal
        visible={confirm}
        message="Подтвердить ?"
        onYes={() => confirmBtn()}
        onNo={() => setConfirm(false)}
        onClose={() => setConfirm(false)}
      />
    </>
  );
};

export default SoputkaProdHistoryPage;
