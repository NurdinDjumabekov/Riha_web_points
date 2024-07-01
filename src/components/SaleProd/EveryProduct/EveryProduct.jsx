////// hooks
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

///// fns
import { changeTemporaryData } from "../../../store/reducers/stateSlice";

///// style
import "./style.scss";

export const EveryProduct = (props) => {
  //// SalePointScreen - для продажи
  const { obj, index, type } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addInTemporary = () => {
    if (type == "sale") {
      // navigate("EverySaleProdScreen", { obj }); //// продолжить
    } else if (type == "soputka") {
      dispatch(changeTemporaryData(obj));
    }
  };

  return (
    <button className="blockEveryMain" onClick={addInTemporary}>
      <div className="blockEveryMain__inner">
        <div>
          <div className="mainContent">
            <p className="titleEvery">{index + 1}.</p>
            <p className="titleEvery width85"> {obj?.product_name}</p>
          </div>
        </div>
        <div className="arrow"></div>
      </div>
    </button>
  );
};
