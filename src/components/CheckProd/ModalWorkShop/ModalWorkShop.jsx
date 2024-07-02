//// tags
import { BottomSheet } from "react-spring-bottom-sheet";

//// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//// fns
import { createInvoiceCheck } from "../../../store/reducers/requestSlice";
import { getWorkShopsForRevision } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";

const ModalWorkShop = ({ bottomSheet, setBottomSheet }) => {
  //// модалка для выбора цеха и продавца для которого ревизия

  const [openCateg, setOpenCateg] = useState(false); /// выбор категории для ревизии

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { listSellersPoints, listWorkShop } = useSelector(
    (state) => state.requestSlice
  );

  const { data } = useSelector((state) => state.saveDataSlice);

  const [obj, setObj] = useState({ guid: "", guidWorkShop: "" });
  ///// guid - guid продавца  //// guidWorkShop - guid цеха

  const closeSeller = () => setBottomSheet(true);
  const closeWorkShop = () => setOpenCateg(false);

  const choiceSeller = (guid) => {
    setObj({ ...obj, guid });
    ////// get список актуальных цех0в продавца
    dispatch(getWorkShopsForRevision(guid));

    closeSeller(); //// закрываю первый bottomSheet
    setOpenCateg(true); //// открываю второй bottomSheet
  };

  ////////////////// choice workshop

  const choiceWorkShop = (guidWorkShop) => {
    setObj({ ...obj, guidWorkShop });

    const ob1 = { seller_guid_to: obj?.guid, guidWorkShop };
    const ob2 = { seller_guid_from: data?.seller_guid, navigate };

    dispatch(createInvoiceCheck({ ...ob1, ...ob2 }));

    //// закрываю все bottomSheet
    closeWorkShop();
    closeSeller();
  };

  return (
    <>
      {/* //////Выбери продавца */}
      <BottomSheet
        open={bottomSheet}
        onDismiss={() => setBottomSheet(false)}
        defaultSnap={({ maxHeight }) => maxHeight * 0.7}
        snapPoints={({ maxHeight }) => maxHeight * 0.7}
      >
        <>
          {listSellersPoints?.length === 0 ? (
            <p className="noneData">Список пустой</p>
          ) : (
            <>
              <h3 className="titleSelectBottomSheet">
                Выберите продавца для ревизии
              </h3>
              <div className="selectBlockBottomSheet">
                {listSellersPoints?.map((item, index) => (
                  <button onClick={() => choiceSeller(item?.guid)} key={index}>
                    <p className="selectText">{item?.fio}</p>
                    <div className="arrow" />
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      </BottomSheet>

      {/* //////Выбери цехa */}
      <BottomSheet
        open={openCateg}
        onDismiss={() => setOpenCateg(false)}
        defaultSnap={({ maxHeight }) => maxHeight * 0.7}
        snapPoints={({ maxHeight }) => maxHeight * 0.7}
      >
        <>
          {listWorkShop?.length === 0 ? (
            <p className="noneData">Список пустой</p>
          ) : (
            <>
              <h3 className="titleSelectBottomSheet">Выберите цех</h3>
              <div className="selectBlockBottomSheet">
                {listWorkShop?.map((item, index) => (
                  <button
                    onClick={() => choiceWorkShop(item?.workshop_guid)}
                    key={index}
                  >
                    <p className="selectText">{item?.workshop}</p>
                    <div className="arrow" />
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      </BottomSheet>
    </>
  );
};

export default ModalWorkShop;
