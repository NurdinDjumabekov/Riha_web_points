////// hooks
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ru from "date-fns/locale/ru";

/////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import DatePicker, { registerLocale } from "react-datepicker";
import ModalSortProds from "../ModalSortProds/ModalSortProds";
import ModalSortPeriodProds from "../ModalSortPeriodProds/ModalSortPeriodProds";

////// imgs
import date from "../../../assets/images/date.png";
import arrow from "../../../assets/icons/arrowNav.svg";

/////// style
import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";

/////// fns
import { changeModalDate } from "../../../store/reducers/stateSlice";

registerLocale("ru", ru);

const SortDateSaleProd = ({ guidInvoice, seller_guid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openDate = () => dispatch(changeModalDate({ periods: true }));

  return (
    <div className="dateSort">
      <NavMenu>
        <button className="actions" onClick={() => navigate(-1)}>
          <img src={arrow} alt="<" />
          <p>Список продаж</p>
        </button>
        <button className="actions date" onClick={openDate}>
          <img src={date} alt="date" />
        </button>
        <ModalSortProds props={{ guidInvoice, seller_guid }} />
        <ModalSortPeriodProds props={{ guidInvoice, seller_guid }} />
      </NavMenu>
    </div>
  );
};

export default SortDateSaleProd;
