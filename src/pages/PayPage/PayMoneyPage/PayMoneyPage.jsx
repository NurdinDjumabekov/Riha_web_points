////hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////fns
import { changeLocalData } from "../../../store/reducers/saveDataSlice";
import { clearListAgents } from "../../../store/reducers/requestSlice";
import { getHistoryBalance } from "../../../store/reducers/requestSlice";
import { getListAgents } from "../../../store/reducers/requestSlice";

/////components
import EveryPay from "../../../components/Pay/EveryPay/EveryPay";
import NavMenu from "../../../common/NavMenu/NavMenu";

//////helpers
import { getLocalDataUser } from "../../../helpers/returnDataUser";

////style
import "./style.scss";
import ModalPayTA from "../../../components/Pay/ModalPayTA/ModalPayTA";

const PayMoneyPage = () => {
  ///// оплата ТА (принятие денег ТА)

  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);

  const { data } = useSelector((state) => state.saveDataSlice);

  const { listHistoryBalance } = useSelector((state) => state.requestSlice);

  const getData = async () => {
    await getLocalDataUser({ changeLocalData, dispatch });
    await dispatch(getHistoryBalance(data?.seller_guid));
    await dispatch(getListAgents(data?.seller_guid));
  };

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => dispatch(clearListAgents());
  }, []);

  return (
    <>
      <NavMenu navText={"Оплата"} />
      <div className="containerPay">
        <button onClick={() => setModalState(true)}>+ Произвести оплату</button>
        <p className="titlePay">История оплат</p>
        <div className="listPay">
          {listHistoryBalance?.map((item) => (
            <EveryPay item={item} key={item?.guid} />
          ))}
        </div>
      </div>
      <ModalPayTA
        modalState={modalState}
        setModalState={setModalState}
        getData={getData}
      />
    </>
  );
};

export default PayMoneyPage;
