////hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////fns
import { getListAgentsSorting } from "../../../store/reducers/requestSlice";
import { createInvoiceSoputkaTT } from "../../../store/reducers/requestSlice";

///// components
import { BottomSheet } from "react-spring-bottom-sheet";

////style
import "./style.scss";

const ModalCreateSoputka = ({ openModal, setOpenModal }) => {
  //// модалка для выбора контрагентов и агентов в сопутке

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModalAgent, setOpenModalAgent] = useState(false);

  const [obj, setObj] = useState({ contragent_guid: "", agent_guid: "" });
  ///// contragent_guid - guid контрагента  //// agent_guid - guid агента

  const { listContrAgents } = useSelector((state) => state.requestSlice);

  const { listAgents } = useSelector((state) => state.requestSlice);

  const { data } = useSelector((state) => state.saveDataSlice);

  ////////////////// выбор контрагента

  const closeContrAgents = () => setOpenModal(false);
  const closeAgents = () => setOpenModalAgent(false);

  const choiceAgent = (guid) => {
    setObj({ ...obj, contragent_guid: guid });
    ////// get список актуальных агентов для торговой точки
    dispatch(getListAgentsSorting(guid));
    closeContrAgents();
    setOpenModalAgent(true); //// открываю вторую модалку
  };

  const createInvoiceSoputka = (agent_guid) => {
    const { seller_guid } = data;
    const dataObj = { comment: "", seller_guid, agent_guid };
    dispatch(createInvoiceSoputkaTT({ navigate, dataObj }));

    setObj({ ...obj, agent_guid });

    //// закрываю аккардионы
    closeContrAgents();
    closeAgents();
  };

  return (
    <div className="modalSoputka">
      {/* ////////////////// выбор контрагента */}
      <BottomSheet
        open={openModal}
        onDismiss={() => setOpenModal(false)}
        defaultSnap={({ maxHeight }) => maxHeight * 0.6}
        snapPoints={({ maxHeight }) => [maxHeight * 0.6]}
      >
        <>
          {listContrAgents?.length === 0 ? (
            <p className="noneData">Список пустой</p>
          ) : (
            <>
              <h3 className="titleSelectBottomSheet">Выберите контрагент</h3>
              <div className="selectBlockBottomSheet">
                {listContrAgents?.map((item) => (
                  <button
                    onClick={() => choiceAgent(item?.guid)}
                    key={item?.guid}
                  >
                    <p className="selectText">{item?.name}</p>
                    <div className="arrow" />
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      </BottomSheet>

      {/* ////////////////// выбор агента */}
      <BottomSheet
        open={openModalAgent}
        onDismiss={() => setOpenModalAgent(false)}
        defaultSnap={({ maxHeight }) => maxHeight * 0.6}
        snapPoints={({ maxHeight }) => [maxHeight * 0.6]}
      >
        <>
          {listAgents?.length === 0 ? (
            <p className="noneData">Список пустой</p>
          ) : (
            <>
              <h3 className="titleSelectBottomSheet">Выберите агента</h3>
              <div className="selectBlockBottomSheet">
                {listAgents?.map((item) => (
                  <button
                    onClick={() => createInvoiceSoputka(item?.guid)}
                    key={item?.guid}
                  >
                    <p className="selectText">{item?.fio}</p>
                    <div className="arrow" />
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      </BottomSheet>
    </div>
  );
};

export default ModalCreateSoputka;
