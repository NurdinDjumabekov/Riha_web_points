////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

/////// fns
import { getListSoldProd } from "../../../store/reducers/requestSlice";
import { deleteSoldProd } from "../../../store/reducers/requestSlice";

////// components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import Krest from "../../../common/Krest/Krest";

////// helpers
import { formatCount } from "../../../helpers/amounts";

////style
import "./style.scss";
import NavMenu from "../../../common/NavMenu/NavMenu";

const SoldProductPage = () => {
  //// список проданных продуктов
  const dispatch = useDispatch();
  const location = useLocation();

  const { guidInvoice } = location.state;
  const [modalItemGuid, setModalItemGuid] = useState(null); // Состояние для идентификатора элемента, для которого открывается модальное окно

  const { listSoldProd } = useSelector((state) => state.requestSlice);

  const getData = () => dispatch(getListSoldProd(guidInvoice));

  useEffect(() => {
    getData();
  }, []);

  const del = (product_guid) => {
    dispatch(deleteSoldProd({ product_guid, getData }));
    setModalItemGuid(null);
  };

  if (listSoldProd?.length === 0) {
    return <p className="noneData">Список пустой</p>;
  }

  return (
    <>
      <NavMenu navText={"Список продаж"} />
      <div className="soldProds">
        <div className="listSoldPros">
          {listSoldProd?.map((item, index) => (
            <div className="listSoldPros__every">
              <div className="parentSold">
                <div className="mainDataSold">
                  <p className="indexNums">{index + 1} </p>
                  <div>
                    <p className="titleDate">{item.date || "..."}</p>
                    <p className="totalPrice">
                      {item?.product_price} сом х {item?.count} {item?.unit} ={" "}
                      {formatCount(item?.total)} сом
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
                message="Отменить продажу ?"
                onYes={() => del(item.guid)}
                onNo={() => setModalItemGuid(null)}
                onClose={() => setModalItemGuid(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SoldProductPage;
