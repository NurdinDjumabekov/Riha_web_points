import React from "react";
import "./style.scss";

const Krest = ({ onClick }) => {
  return (
    <button className="krest" onClick={onClick}>
      <div className="line deg" />
      <div className="line degMinus" />
    </button>
  );
};

export default Krest;
