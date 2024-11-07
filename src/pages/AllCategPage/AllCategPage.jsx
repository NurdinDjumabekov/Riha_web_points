///// hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

/////  components
import EveryCategory from "../../components/AllCategory/EveryCategory";
import NavMenu from "../../common/NavMenu/NavMenu";
import { LogOut } from "../../components/Header/LogOut/LogOut";
import UserInfo from "../../components/Header/UserInfo/UserInfo";

////// helpers

///// fns
import { getBalance } from "../../store/reducers/requestSlice";

////// styles
import "./style.scss";
import Graphics from "../../components/AllCategPage/Graphics/Graphics";

const AllCategPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.saveDataSlice);
  const { balance } = useSelector((state) => state.requestSlice);

  const getData = () => dispatch(getBalance(data?.seller_guid));

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <Graphics />;
};

export default AllCategPage;
