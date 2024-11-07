////// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////components
import ModalCreateSoputka from "../../../components/Soputka/ModalCreateSoputka/ModalCreateSoputka";

/////redux
import { getListContrAgents } from "../../../store/reducers/requestSlice";
import { clearListAgents } from "../../../store/reducers/requestSlice";
import { clearListCategory } from "../../../store/reducers/requestSlice";
import { clearListProductTT } from "../../../store/reducers/requestSlice";
import { getHistorySoputka } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";
import ViewInvoiceHisotry from "../../../common/ViewInvoiceHisotry/ViewInvoiceHisotry";

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
      <div className="soputkaParent">
        <div className="actionBlockHeader">
          <button className="saveAction" onClick={() => setOpenModal(true)}>
            + Создать накладную для сопутки
          </button>
        </div>
        <ViewInvoiceHisotry
          keyLink={"/soputka/history"}
          title={"История сопутки"}
          list={listHistorySoputka}
        />
      </div>
      <ModalCreateSoputka setOpenModal={setOpenModal} openModal={openModal} />
    </>
  );
};

export default SoputkaMainPage;
