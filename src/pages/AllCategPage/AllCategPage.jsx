///// hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

/////  components
// import { EveryCategory } from "../../components/AllCategory/EveryCategory";

////// helpers
import { dataCategory } from "../../helpers/Data";
import { getLocalDataUser } from "../../helpers/returnDataUser";

///// fns
import { getBalance } from "../../store/reducers/requestSlice";

////// styles
import "./style.scss";
import EveryCategory from "../../components/AllCategory/EveryCategory";
import NavMenu from "../../common/NavMenu/NavMenu";
import { LogOut } from "../../components/Header/LogOut/LogOut";
import UserInfo from "../../components/Header/UserInfo/UserInfo";

const AllCategPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.saveDataSlice);
  const { preloader, balance } = useSelector((state) => state.requestSlice);

  // useFocusEffect(
  //   useCallback(() => {
  //     getData();
  //   }, [])
  // );

  const getData = () => dispatch(getBalance(data?.seller_guid));

  useEffect(() => {
    getData();
  }, []);

  const goPage = () => navigate("HistoryBalance");

  return (
    <>
      <NavMenu>
        <UserInfo /> <LogOut />
      </NavMenu>
      <div className="parentBlock">
        <div className="balance" onClick={goPage}>
          <div>
            <div className="balance__inner">
              <p>Баланс</p>
              <div></div>
            </div>
            <p className="balance__num">{balance || 0} сом</p>
          </div>
          <p className="balance__history">История</p>
        </div>
      </div>

      <div className="allCateg">
        {dataCategory?.map((item) => (
          <EveryCategory obj={item} key={item?.codeid} />
        ))}
      </div>
    </>
  );
};

export default AllCategPage;
