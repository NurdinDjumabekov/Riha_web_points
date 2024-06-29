////// hooks
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

///// components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

///// fns
import { changePreloader } from "../../../store/reducers/requestSlice";
import { clearLogin } from "../../../store/reducers/stateSlice";
import { clearLocalData } from "../../../store/reducers/saveDataSlice";

////style
import "./style.scss";

export const LogOut = () => {
  const [modal, setMoodal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(changePreloader(true));
    window.location.reload();
    setTimeout(() => {
      navigate("/");
      dispatch(changePreloader(false));
    }, 300);
    dispatch(clearLogin());
    dispatch(clearLocalData());
  };

  return (
    <>
      <button onClick={() => setMoodal(true)} className="logoutParent">
        <div className="logoutInner">
          <div className="line">
            <div className="lineInner"></div>
          </div>
        </div>
      </button>

      <ConfirmationModal
        visible={modal}
        message="Выйти c приложения ?"
        onYes={() => logOut()}
        onNo={() => setMoodal(false)}
        onClose={() => setMoodal(false)}
      />
    </>
  );
};