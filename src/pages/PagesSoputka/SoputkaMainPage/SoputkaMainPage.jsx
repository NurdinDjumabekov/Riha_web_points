////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////components
import ModalCreateSoputka from "../../../components/Soputka/ModalCreateSoputka/ModalCreateSoputka";
import ViewInvoiceHisotry from "../../../common/ViewInvoiceHisotry/ViewInvoiceHisotry";

///// fns
import { getListContrAgents } from "../../../store/reducers/requestSlice";
import { clearListAgents } from "../../../store/reducers/requestSlice";
import { clearListCategory } from "../../../store/reducers/requestSlice";
import { clearListProductTT } from "../../../store/reducers/requestSlice";
import { getHistorySoputka } from "../../../store/reducers/requestSlice";

//// style
import "./style.scss";

const SoputkaMainPage = () => {
  //// Сопуткаа
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(0); /// 1 - принятие сопутки, 2 - возврат

  const { data } = useSelector((state) => state.saveDataSlice);

  const { listHistorySoputka } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getData();

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
      <div className="soputkaParent">
        <div className="rightPosition">
          <button className="saveAction return" onClick={() => setOpenModal(7)}>
            Оформить возврат
          </button>
          <button className="saveAction" onClick={() => setOpenModal(3)}>
            Создать накладную
          </button>
        </div>
        <ViewInvoiceHisotry
          keyLink={"/soputka/history"}
          title={"История сопутки"}
          list={listHistorySoputka}
          type="soputka"
        />
      </div>
      <ModalCreateSoputka setOpenModal={setOpenModal} openModal={openModal} />
    </>
  );
};

export default SoputkaMainPage;
