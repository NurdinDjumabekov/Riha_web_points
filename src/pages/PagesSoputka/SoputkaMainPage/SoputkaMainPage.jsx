////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////components
import { AllHistoryInvoice } from "../../../common/AllHistoryInvoice/AllHistoryInvoice";
import ModalCreateSoputka from "../../../components/Soputka/ModalCreateSoputka/ModalCreateSoputka";
import NavMenu from "../../../common/NavMenu/NavMenu";

/////redux
import { getListContrAgents } from "../../../store/reducers/requestSlice";
import { clearListAgents } from "../../../store/reducers/requestSlice";
import { clearListCategory } from "../../../store/reducers/requestSlice";
import { clearListProductTT } from "../../../store/reducers/requestSlice";
import { getHistorySoputka } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";

const SoputkaMainPage = () => {
  //// Сопуткаа
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const { data } = useSelector((state) => state.saveDataSlice);

  const { listHistorySoputka } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      dispatch(clearListCategory());
      dispatch(clearListProductTT());
      dispatch(clearListAgents());
      //// очищаю список категорий,агентов и товаров
    };
  }, []);

  const getData = () => {
    dispatch(getHistorySoputka(data?.seller_guid));
    dispatch(getListContrAgents()); /// get список контрагентов
  };

  return (
    <>
      <NavMenu navText={"Сопутка"} />
      <div className="soputkaParent">
        <div className="soputkaBlock">
          <button className="soputka" onClick={() => setOpenModal(true)}>
            + Создать накладную для сопутки
          </button>
        </div>
        <div className="selectBlock">
          <p className="title">История сопутки</p>
          <div className="listInvoices">
            {listHistorySoputka?.map((item, index) => (
              <AllHistoryInvoice
                key={item?.guid}
                item={item}
                index={index}
                keyLink={"/soputka/history"}
              />
            ))}
          </div>
        </div>
      </div>
      <ModalCreateSoputka setOpenModal={setOpenModal} openModal={openModal} />
    </>
  );
};

export default SoputkaMainPage;
