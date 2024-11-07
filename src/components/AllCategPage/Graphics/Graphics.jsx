/////// hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/////// components

////// style
import "./style.scss";

import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

const Graphics = () => {
  const data = [
    { x: "1", y: 10 },
    { x: "5", y: 10 },
    { x: "10", y: 30 },
    { x: "15", y: 20 },
    { x: "20", y: 27 },
    { x: "25", y: 18 },
    { x: "30", y: 23 },
  ];

  const data2 = [
    { x: "Jan", y: 10 },
    { x: "Feb", y: 30 },
    { x: "Mar", y: 20 },
    { x: "Apr", y: 27 },
    { x: "May", y: 18 },
    { x: "Jun", y: 23 },
    { x: "Jul", y: 34 },
    { x: "Aug", y: 56 },
    { x: "Sep", y: 76 },
    { x: "Oct", y: 90 },
    { x: "Nov", y: 99 },
  ];

  return (
    <div className="graphics">
      <div className="graphicsMonth">
        <h5>Графика продаж за последний месяц</h5>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            data={data}
            style={{
              data: { stroke: "#4169E1" },
              parent: { border: "1px solid #ccc" },
            }}
          />
          <VictoryLine
            data={data?.map((d) => ({ x: d.x, y: d.y * 1.1 }))}
            style={{
              data: { stroke: "#FF69B4" },
              parent: { border: "1px solid #ccc" },
            }}
          />
        </VictoryChart>
      </div>

      <div className="graphicsMonth">
        <h5>Графика расходов (трат)</h5>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            data={data2}
            style={{
              data2: { stroke: "#4169E1" },
              parent: { border: "1px solid #ccc" },
            }}
          />
          <VictoryLine
            data={data2?.map((d) => ({ x: d.x, y: d.y * 1.1 }))}
            style={{
              data: { stroke: "#FF69B4" },
              parent: { border: "1px solid #ccc" },
            }}
          />
        </VictoryChart>
      </div>

      <div className="graphicsMonth">
        <h5>Графика возврата товара</h5>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            data={data2}
            style={{
              data2: { stroke: "#4169E1" },
              parent: { border: "1px solid #ccc" },
            }}
          />
          <VictoryLine
            data={data2?.map((d) => ({ x: d.x, y: d.y * 1.1 }))}
            style={{
              data: { stroke: "#FF69B4" },
              parent: { border: "1px solid #ccc" },
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default Graphics;
