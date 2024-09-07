////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/////// fns
import { getListSoldProd } from "../../../store/reducers/requestSlice";
import { deleteSoldProd } from "../../../store/reducers/requestSlice";

////// components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import Krest from "../../../common/Krest/Krest";
import SortDateSaleProd from "../../../components/SaleProd/SortDateSaleProd/SortDateSaleProd";

////// helpers
import { formatCount, sumtotalPrice } from "../../../helpers/amounts";

////style
import "./style.scss";

const SoldProductPage = () => {
  //// список проданных продуктов
  const dispatch = useDispatch();
  const location = useLocation();

  const { guidInvoice } = location.state;
  const [modalItemGuid, setModalItemGuid] = useState(null); // Состояние для идентификатора элемента, для которого открывается модальное окно

  const { listSoldProd } = useSelector((state) => state.requestSlice);
  const { seller_guid } = useSelector((state) => state.saveDataSlice.data);

  const getData = () => dispatch(getListSoldProd({ guidInvoice, seller_guid }));

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const del = (product_guid) => {
    dispatch(deleteSoldProd({ product_guid, getData }));
    setModalItemGuid(null);
  };

  const noneData = listSoldProd?.length == 0;

  if (!!noneData) {
    return <p className="noneData">Список пустой</p>;
  }

  return (
    <>
      <SortDateSaleProd guidInvoice={guidInvoice} seller_guid={seller_guid} />
      {!!!noneData && (
        <p className="totalSum">
          Итоговая сумма: {sumtotalPrice(listSoldProd) || 0} сом
        </p>
      )}
      <div className="soldProds">
        <div className="listSoldPros">
          {listSoldProd?.map((item, index) => (
            <div className="listSoldPros__every" key={index}>
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
