/////// hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////fns
import { confirmSoputka } from "../../../store/reducers/requestSlice";
import { deleteSoputkaProd } from "../../../store/reducers/requestSlice";
import { getListSoputkaProd } from "../../../store/reducers/requestSlice";

/////components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import Krest from "../../../common/Krest/Krest";
import ResultCounts from "../../../common/ResultCounts/ResultCounts";
import NavMenu from "../../../common/NavMenu/NavMenu";

///helpers
import { sumSoputkaProds } from "../../../helpers/amounts";

////style
import "./style.scss";

const SoputkaProductPage = ({}) => {
  //// список проданных продуктов
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { guidInvoice } = location.state;

  const [modalItemGuid, setModalItemGuid] = useState(null); // Состояние для идентификатора элемента, для которого открывается модальное окно
  const [modalConfirm, setModalConfirm] = useState(false);

  const { listProdSoputka } = useSelector((state) => state.requestSlice);

  const getData = () => dispatch(getListSoputkaProd(guidInvoice));

  useEffect(() => {
    getData();
  }, [guidInvoice]);

  const del = (product_guid) => {
    dispatch(deleteSoputkaProd({ product_guid, getData }));
    setModalItemGuid(null);
    ////// удаление продуктов сопутки
  };

  const confirmBtn = () => {
    dispatch(confirmSoputka({ invoice_guid: guidInvoice, navigate }));
    ///// подтверждение накладной сопутки
  };

  const newList = listProdSoputka?.[0]?.list;

  const none = newList?.length === 0;

  const moreOne = newList?.length > 0;

  return (
    <>
      <NavMenu navText={"Сопутствующие товары"} />
      <div className="mainSoputkaProds">
        {none ? (
          <p className="noneData">Список пустой</p>
        ) : (
          <div className="mainSoputkaProds__inner">
            {newList?.map((item, index) => (
              <div className="mainSoputkaProds__inner__every" key={item?.guid}>
                <div className="mainInfo">
                  <div className="mainData">
                    <p className="indexNums">{index + 1} </p>
                    <div>
                      <p className="titleDate">{item?.date || "..."}</p>
                      <p className="totalPrice">
                        {item?.sale_price} сом х {item?.count} {item?.unit} ={" "}
                        {item?.total_soputka} сом
                      </p>
                    </div>
                  </div>
                  <Krest onClick={() => setModalItemGuid(item?.guid)} />
                </div>
                <div>
                  <p className="title">{item?.product_name}</p>
                </div>

                <ConfirmationModal
                  visible={modalItemGuid === item?.guid}
                  message="Отменить ?"
                  onYes={() => del(item.guid)}
                  onNo={() => setModalItemGuid(null)}
                  onClose={() => setModalItemGuid(null)}
                />
              </div>
            ))}

            <div className="actionBlock">
              <ResultCounts list={newList} />
              <p className="totalItemSumm">
                Сумма: {sumSoputkaProds(listProdSoputka?.[0]?.list)} сом
              </p>
              {moreOne && (
                <button
                  className="sendBtn"
                  onClick={() => setModalConfirm(true)}
                >
                  Подтвердить
                </button>
              )}
            </div>
          </div>
        )}

        <ConfirmationModal
          visible={modalConfirm}
          message="Подтвердить ?"
          onYes={confirmBtn}
          onNo={() => setModalConfirm(false)}
          onClose={() => setModalConfirm(false)}
        />
      </div>
    </>
  );
};

export default SoputkaProductPage;
