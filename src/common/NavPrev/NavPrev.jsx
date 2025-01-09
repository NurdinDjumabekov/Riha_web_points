import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const NavPrev = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => navigate(-1)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? "rgba(0, 0, 0, 0.069)" : "transparent",
        width: 35,
        height: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        borderRadius: "50%",
        paddingRight: 2,
      }}
    >
      <ArrowBackIosNewRoundedIcon
        sx={{ width: 21, height: 21, color: "rgba(0, 0, 0, 0.679)" }}
      />
    </button>
  );
};

export default NavPrev;
