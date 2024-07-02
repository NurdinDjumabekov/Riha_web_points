////hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

////components
import EveryPay from "../../../components/Pay/EveryPay/EveryPay";

/////fns
import { getHistoryBalance } from "../../../store/reducers/requestSlice";

////style
import "./style.scss";
import NavMenu from "../../../common/NavMenu/NavMenu";

const HistoryBalance = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.saveDataSlice);

  const { listHistoryBalance } = useSelector((state) => state.requestSlice);

  useEffect(() => {
    dispatch(getHistoryBalance(data?.seller_guid));
  }, []);

  return (
    <>
      <NavMenu navText={"История баланса"} />
      <div className="listBalance">
        {listHistoryBalance?.map((item) => (
          <EveryPay item={item} key={item?.guid} />
        ))}
      </div>
    </>
  );
};

export default HistoryBalance;
