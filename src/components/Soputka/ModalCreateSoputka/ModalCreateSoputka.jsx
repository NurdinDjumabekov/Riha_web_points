////hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////fns
import { getListAgentsSorting } from "../../../store/reducers/requestSlice";
import { createInvoiceSoputkaTT } from "../../../store/reducers/requestSlice";

///// components
import Select from "react-select";
import MyModals from "../../../common/MyModals/MyModals";
import ReactDatePicker from "react-datepicker";

////style
import "./style.scss";

//// helpers
import { transformLists } from "../../../helpers/transformLists";
import { myAlert } from "../../../helpers/MyAlert";
import { ru } from "date-fns/locale";
import { format } from "date-fns";

///// icons
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const ModalCreateSoputka = ({ openModal, setOpenModal }) => {
  //// модалка для выбора контрагентов и агентов в сопутке

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeContrAgent, setActiveContrAgent] = useState({});
  const [activeAgent, setActiveAgent] = useState({});

  const [obj, setObj] = useState({
    contragent_guid: "",
    agent_guid: "",
    date: new Date(),
  });

  const { listContrAgents } = useSelector((state) => state.requestSlice);
  const { listAgents } = useSelector((state) => state.requestSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const listContrAgentsNew = transformLists(listContrAgents, "guid", "name");
  const listAgentsNew = transformLists(listAgents, "guid", "fio");

  async function choiceContrAgent({ label, value }) {
    setActiveContrAgent({ label, value });
    setObj({ ...obj, contragent_guid: value });
    ////// get список актуальных агентов для торговой точки
    const res = await dispatch(getListAgentsSorting(value)).unwrap();
    if (res?.[0]?.guid) {
      setActiveAgent({ label: res?.[0]?.fio, value: res?.[0]?.guid });
    } else {
      setActiveAgent({});
    }
  }

  function choiceAgent({ label, value }) {
    setActiveAgent({ label, value });
  }

  function onChangeDate(date) {
    setObj({ ...obj, date });
  }

  async function createInvoiceSoputka(e) {
    e.preventDefault();

    if (!!!activeContrAgent?.value)
      return myAlert("Выберите контрагента", "error");

    if (!!!activeAgent?.value) return myAlert("Выберите агента", "error");

    const send = {
      comment: "",
      seller_guid: data?.seller_guid,
      agent_guid: activeAgent?.value,
      date: format(obj?.date, "yyyy-MM-dd HH:mm", { locale: ru }),
      invoice_type: openModal,
    };

    const res = await dispatch(createInvoiceSoputkaTT(send)).unwrap();

    const state = { invoice_guid: res?.invoice_guid, type: 2 };
    if (!!res?.invoice_guid) {
      navigate(`/soputka/qr_scan`, { state });
    }
  }

  const objType = {
    3: {
      title: "Создание накладной сопутки",
      dateText: "Дата поступления сопутки",
    },
    7: {
      title: "Оформление возврата сопутки",
      dateText: "Дата оформления возврата сопутки",
    },
  };

  function closeModal() {
    setObj({ date: new Date() });
    setOpenModal(0);
    setActiveContrAgent({});
    setActiveAgent({});
  }

  return (
    <MyModals
      openModal={!!openModal}
      closeModal={closeModal}
      title={objType?.[openModal]?.title}
    >
      <form className="actionsAddProd" onSubmit={createInvoiceSoputka}>
        <div className="inputSend">
          <div className="myInputs">
            <h6>Выберите контрагента</h6>
            <Select
              options={listContrAgentsNew}
              className="select"
              onChange={choiceContrAgent}
              value={activeContrAgent}
            />
          </div>
          <div className="myInputs">
            <h6>Выберите агента</h6>
            <Select
              options={listAgentsNew}
              className="select"
              onChange={choiceAgent}
              value={activeAgent}
            />
          </div>
          <div className="myInputs">
            <h6>{objType?.[openModal]?.dateText}</h6>
            <div className="date">
              <ReactDatePicker
                selected={obj?.date}
                onChange={onChangeDate}
                yearDropdownItemNumber={100}
                placeholderText="ДД.ММ.ГГГГ ЧЧ:ММ"
                shouldCloseOnSelect={true}
                scrollableYearDropdown
                dateFormat="yyyy.MM.dd HH:mm"
                locale={ru}
                maxDate={new Date()}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Время"
              />
            </div>
          </div>
          <button className="saveAction" type="submit">
            <LibraryAddIcon sx={{ width: 16, height: 16 }} />
            <p>Создать накладную для сопутки</p>
          </button>
        </div>
      </form>
    </MyModals>
  );
};

export default ModalCreateSoputka;
