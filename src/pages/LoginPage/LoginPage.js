import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// fns
import { changeDataLogin, clearLogin } from "../../store/reducers/stateSlice";
import { logInAccount } from "../../store/reducers/requestSlice";

////imgs
import logoImg from "../../assets/images/riha.png";

///// style
import "./style.scss";

//// helpers
import CLOUDS from "vanta/src/vanta.net";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const { dataLogin } = useSelector((state) => state.stateSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeDataLogin({ ...dataLogin, [name]: value }));
  };

  const sendLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    if (dataLogin?.login && dataLogin?.password) {
      dispatch(logInAccount({ dataLogin, navigate, data }));
    } else {
      alert("Введите логин и пароль!");
    }
  };

  const handleFocus = (e) => {
    e.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    dispatch(clearLogin());
  }, [dispatch]);

  useEffect(() => {
    CLOUDS({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xff0000, // Change this to match your theme, e.g., red dots in the image
      backgroundColor: 0xfff3e0, // Light, clean background similar to the image
      maxDistance: 15.0, // Reducing distance between points to make it subtle
      spacing: 20.0, // Increase spacing if needed for a cleaner look
    });
  }, []);

  return (
    <form onSubmit={sendLogin} className="paretnInput" id="vanta">
      <div className="paretnInput__inner">
        <div className="logoBlock">
          <img src={logoImg} alt="Logo" className="logo" />
        </div>
        <div>
          <p className="textInput">Введите логин</p>
          <input
            ref={loginRef}
            value={dataLogin?.login}
            onChange={onChange}
            placeholder={"..."}
            onFocus={handleFocus}
            name="login"
            className="input"
            type="text"
            required
          />
        </div>
        <div>
          <p className="textInput">Введите пароль</p>
          <input
            ref={passwordRef}
            value={dataLogin?.password}
            onChange={onChange}
            placeholder={"..."}
            onFocus={handleFocus}
            name="password"
            type="password"
            className="input"
            required
          />
        </div>
        <button type="submit" className="loginBtn">
          Войти
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
